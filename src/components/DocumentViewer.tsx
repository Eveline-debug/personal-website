import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CardComponent } from "@/components/CardComponent";
import { ExternalLink } from "lucide-react";

interface Document {
  id: string;
  title: string;
  source_url: string | null;
  created_at: string;
}

interface Card {
  id: string;
  card_type: string;
  content: string[];
}

interface DocumentViewerProps {
  documentId: string;
}

const CARD_TYPES = {
  problem: { label: "问题", icon: "❓" },
  core_insight: { label: "核心观点", icon: "💡" },
  architecture: { label: "架构方案", icon: "🏗️" },
  whats_new: { label: "创新点", icon: "✨" },
  limitations: { label: "局限性", icon: "⚠️" },
  who_should_care: { label: "适用人群", icon: "👥" },
};

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [document, setDocument] = useState<Document | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocument();
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", documentId)
        .single();

      if (error) throw error;
      setDocument(data);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("document_id", documentId);

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardUpdate = async (cardId: string, newContent: string[]) => {
    try {
      const { error } = await supabase
        .from("cards")
        .update({ content: newContent })
        .eq("id", cardId);

      if (error) throw error;

      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? { ...card, content: newContent } : card
        )
      );
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (!document) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <Alert variant="destructive">
          <AlertDescription>文档未找到</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* 文档头部 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {new Date(document.created_at).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {document.source_url && (
            <a
              href={document.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              查看原文
            </a>
          )}
        </div>
      </div>

      {/* AI生成提示 */}
      <Alert>
        <AlertDescription className="text-xs">
          ⚠️ AI 生成内容，非事实保证。所有卡片均可编辑。
        </AlertDescription>
      </Alert>

      {/* 卡片列表 */}
      <div className="space-y-4">
        {Object.entries(CARD_TYPES).map(([type, { label, icon }]) => {
          const card = cards.find((c) => c.card_type === type);
          return (
            <CardComponent
              key={type}
              id={card?.id || ""}
              type={type}
              label={label}
              icon={icon}
              content={card?.content || []}
              onUpdate={handleCardUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}
