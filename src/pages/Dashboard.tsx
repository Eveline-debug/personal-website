import { useState } from "react";
import { DocumentList } from "@/components/DocumentList";
import { DocumentViewer } from "@/components/DocumentViewer";
import { CreateDocumentDialog } from "@/components/CreateDocumentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Brain, LogOut, Search, Plus } from "lucide-react";

export default function Dashboard() {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "登出失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 左侧文档列表 */}
      <div className="w-80 border-r border-border flex flex-col bg-card">
        {/* 头部 */}
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="font-semibold text-lg">长文本阅读小助手</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文档..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* 新建按钮 */}
          <Button onClick={() => setCreateDialogOpen(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            新建文档
          </Button>
        </div>

        {/* 文档列表 */}
        <DocumentList
          searchQuery={searchQuery}
          selectedId={selectedDocumentId}
          onSelect={setSelectedDocumentId}
        />
      </div>

      {/* 右侧文档查看器 */}
      <div className="flex-1 overflow-auto">
        {selectedDocumentId ? (
          <DocumentViewer documentId={selectedDocumentId} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2">
              <Brain className="w-12 h-12 mx-auto opacity-50" />
              <p className="text-lg">选择一个文档开始查看</p>
              <p className="text-sm">或创建新文档进行内容分析</p>
            </div>
          </div>
        )}
      </div>

      {/* 创建文档对话框 */}
      <CreateDocumentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={(docId) => {
          setSelectedDocumentId(docId);
          setCreateDialogOpen(false);
        }}
      />
    </div>
  );
}
