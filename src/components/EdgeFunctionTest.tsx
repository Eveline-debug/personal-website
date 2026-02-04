import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export function EdgeFunctionTest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const testEdgeFunction = async () => {
    setTesting(true);
    setResult(null);

    try {
      const testText = "这是一个测试文本。用于验证Edge Function是否正常工作。";
      
      const response = await supabase.functions.invoke(
        "analyze-content-b2513ebae741",
        {
          body: { text: testText },
        }
      );

      console.log("Test response:", response);

      if (response.error) {
        let errorMsg = `错误: ${response.error.message || JSON.stringify(response.error)}`;
        
        // 提供更详细的错误诊断
        if (response.error.status === 404) {
          errorMsg += "\n\n❌ Edge Function 未找到。请确保已部署到 Supabase。";
        } else if (response.error.status === 500) {
          errorMsg += "\n\n❌ Edge Function 内部错误。可能原因：\n- 环境变量 AI_API_TOKEN_b2513ebae741 未配置\n- API 调用失败";
        } else if (response.error.status === 401 || response.error.status === 403) {
          errorMsg += "\n\n❌ 认证失败。请检查 Supabase 密钥配置。";
        }
        
        setResult({
          success: false,
          message: `错误: ${response.error.message || JSON.stringify(response.error)}`,
        });
      } else if (response.data && response.data.cards) {
        setResult({
          success: true,
          message: "✅ Edge Function 工作正常！",
        });
      } else {
        setResult({
          success: false,
          message: "返回数据格式不正确",
        });
      }
    } catch (error) {
      console.error("Test error:", error);
      setResult({
        success: false,
        message: `测试失败: ${error instanceof Error ? error.message : "未知错误"}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={testEdgeFunction}
        disabled={testing}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {testing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        测试 Edge Function 连接
      </Button>

      {result && (
        <Alert variant={result.success ? "default" : "destructive"}>
          <div className="flex items-start gap-2">
            {result.success ? (
              <CheckCircle2 className="h-4 w-4 mt-0.5" />
            ) : (
              <XCircle className="h-4 w-4 mt-0.5" />
            )}
            <AlertDescription className="text-xs">
              {result.message}
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}
