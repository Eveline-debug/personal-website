import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const AI_API_TOKEN = Deno.env.get("AI_API_TOKEN_b2513ebae741");
    if (!AI_API_TOKEN) {
      throw new Error("AI_API_TOKEN is not configured");
    }

    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Text content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 结构化拆解的系统提示
    const systemPrompt = `你是一个专业的内容分析助手，负责将AI产品、研究论文或技术博客拆解为结构化的知识卡片。

**重要规则：**
1. 严格按照原文内容提取信息，禁止主观推断或延展
2. 每个卡片包含3-6条要点
3. 每条要点不超过30字
4. 如果原文未明确提及某个维度，该卡片的bullets可以为空数组
5. 必须返回严格的JSON格式

**输出格式：**
\`\`\`json
{
  "problem": ["要点1", "要点2"],
  "core_insight": ["要点1", "要点2"],
  "architecture": ["要点1", "要点2"],
  "whats_new": ["要点1", "要点2"],
  "limitations": ["要点1", "要点2"],
  "who_should_care": ["要点1", "要点2"]
}
\`\`\`

**卡片类型说明：**
- problem: 这篇内容试图解决什么问题？
- core_insight: 核心观点或结论是什么？
- architecture: 方案或系统如何运作？
- whats_new: 相对已有工作的新增点
- limitations: 已知局限或失败场景
- who_should_care: 适合哪些人群关注？`;

    const userPrompt = `请分析以下内容并按照要求生成结构化卡片：

${text}

记住：
1. 只提取原文明确提到的信息
2. 每条要点不超过30字
3. 返回严格的JSON格式`;

    const response = await fetch("https://api.enter.pro/code/api/v1/ai/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_TOKEN}`,
        "Content-Type": "application/json",
        "X-Swim-Lane": "xm",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-preview",
        messages: [
          { role: "user", content: systemPrompt },
          { role: "assistant", content: "我明白了。我会严格按照原文内容提取信息，生成结构化的JSON格式卡片，每条要点不超过30字，如果原文未提及则返回空数组。" },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API Error:", errorText);
      return new Response(
        JSON.stringify({ error: "AI service error", details: errorText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    const content = result.content?.[0]?.text || "";

    // 提取JSON内容
    let cards;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cards = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Content:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 验证并规范化卡片数据
    const validatedCards = {
      problem: Array.isArray(cards.problem) ? cards.problem : [],
      core_insight: Array.isArray(cards.core_insight) ? cards.core_insight : [],
      architecture: Array.isArray(cards.architecture) ? cards.architecture : [],
      whats_new: Array.isArray(cards.whats_new) ? cards.whats_new : [],
      limitations: Array.isArray(cards.limitations) ? cards.limitations : [],
      who_should_care: Array.isArray(cards.who_should_care) ? cards.who_should_care : [],
    };

    return new Response(
      JSON.stringify({ cards: validatedCards }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});