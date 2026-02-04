import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { EdgeFunctionTest } from "@/components/EdgeFunctionTest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Link as LinkIcon, FileText } from "lucide-react";

interface CreateDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (documentId: string) => void;
}

export function CreateDocumentDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateDocumentDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<"url" | "text">("url");
  
  // URL输入
  const [url, setUrl] = useState("");
  
  // 文本输入
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      let content = "";
      let sourceUrl: string | null = null;
      let docTitle = "";

      if (inputType === "url") {
        if (!url) {
          throw new Error("请输入URL");
        }
        
        // 抓取URL内容
        toast({
          title: "正在抓取网页内容...",
          description: "请稍候",
        });

        let fetchData;
        try {
          const response = await supabase.functions.invoke(
            "fetch-url-content-b2513ebae741",
            {
              body: { url },
            }
          );

          console.log("Fetch URL response:", response);

          if (response.error) {
            console.error("Fetch URL error:", response.error);
            throw new Error(`无法抓取网页: ${response.error.message || "请检查URL是否正确"}`);
          }

          fetchData = response.data;

          if (!fetchData || !fetchData.content) {
            throw new Error("网页内容抓取失败，请尝试直接粘贴文本");
          }
        } catch (err) {
          console.error("URL fetch failed:", err);
          throw new Error(
            err instanceof Error
              ? err.message
              : "网页抓取失败，请尝试直接粘贴文本"
          );
        }

        sourceUrl = url;
        docTitle = fetchData.title || new URL(url).hostname;
        content = fetchData.content;
      } else {
        if (!title || !text) {
          throw new Error("请填写标题和内容");
        }
        docTitle = title;
        content = text;
      }

      // 调用AI分析Edge Function
      toast({
        title: "AI正在分析内容...",
        description: "这可能需要10-30秒",
      });

      let analysisData;
      try {
        const response = await supabase.functions.invoke(
          "analyze-content-b2513ebae741",
          {
            body: { text: content },
          }
        );

        console.log("Analysis response:", response);

        if (response.error) {
          console.error("Analysis error:", response.error);
          throw new Error(`AI分析失败: ${response.error.message || JSON.stringify(response.error)}`);
        }

        analysisData = response.data;

        if (!analysisData || !analysisData.cards) {
          throw new Error("AI分析返回数据格式错误");
        }
      } catch (err) {
        console.error("Edge function call failed:", err);
        throw new Error(
          err instanceof Error 
            ? `Edge Function调用失败: ${err.message}` 
            : "Edge Function调用失败，请稍后重试"
        );
      }

      // 创建文档
      const { data: document, error: docError } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          title: docTitle,
          source_url: sourceUrl,
          raw_text: content,
        })
        .select()
        .single();

      if (docError) throw docError;

      // 创建卡片
      const cards = analysisData.cards;
      const cardInserts = Object.entries(cards).map(([type, content]) => ({
        document_id: document.id,
        card_type: type,
        content: content as string[],
      }));

      const { error: cardsError } = await supabase
        .from("cards")
        .insert(cardInserts);

      if (cardsError) throw cardsError;

      toast({
        title: "文档创建成功",
        description: "AI 已完成结构化拆解",
      });

      // 重置表单
      setUrl("");
      setTitle("");
      setText("");
      
      onSuccess(document.id);
    } catch (error) {
      console.error("Error creating document:", error);
      toast({
        title: "创建失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>创建新文档</DialogTitle>
          <DialogDescription>
            输入URL或直接粘贴文本内容，AI将自动生成结构化卡片
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs
            value={inputType}
            onValueChange={(v) => setInputType(v as "url" | "text")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <LinkIcon className="h-4 w-4 mr-2" />
                URL
              </TabsTrigger>
              <TabsTrigger value="text">
                <FileText className="h-4 w-4 mr-2" />
                文本
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">网页 URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  支持博客、论文页面、产品介绍等
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">文档标题</Label>
                <Input
                  id="title"
                  placeholder="例：GPT-4 Technical Report"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">文本内容</Label>
                <Textarea
                  id="text"
                  placeholder="粘贴文章、论文或产品介绍全文..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={loading}
                  rows={12}
                  className="resize-none font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  建议内容在 500-5000 字之间以获得最佳效果
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "分析中..." : "创建并分析"}
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground pt-2 border-t space-y-3">
          <p>⚠️ AI 分析可能需要 10-30 秒，请耐心等待</p>
          <EdgeFunctionTest />
        </div>
      </DialogContent>
    </Dialog>
  );
}
