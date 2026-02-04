import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  source_url: string | null;
  created_at: string;
}

interface DocumentListProps {
  searchQuery: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DocumentList({ searchQuery, selectedId, onSelect }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("documents")
        .select("id, title, source_url, created_at")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center text-muted-foreground">
        <div className="space-y-2">
          <FileText className="w-8 h-8 mx-auto opacity-50" />
          <p className="text-sm">
            {searchQuery ? "未找到匹配的文档" : "还没有文档"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelect(doc.id)}
            className={cn(
              "w-full text-left p-3 rounded-lg border transition-all",
              "hover:bg-accent hover:border-primary/20",
              selectedId === doc.id
                ? "bg-accent border-primary shadow-sm"
                : "bg-card border-border"
            )}
          >
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">
                  {doc.title}
                </h3>
                {doc.source_url && (
                  <p className="text-xs text-muted-foreground truncate">
                    {new URL(doc.source_url).hostname}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(doc.created_at).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
