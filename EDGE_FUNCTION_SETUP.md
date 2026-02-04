# Edge Function 部署指南

## 问题诊断

如果遇到 "Edge Function 调用错误"，请按以下步骤排查：

### 1. 检查 Edge Function 是否已部署

Edge Function 需要部署到 Supabase 才能使用。有两种部署方式：

#### 方式一：使用 Supabase CLI（推荐）

```bash
# 1. 安装 Supabase CLI（如果还没有）
npm install -g supabase

# 2. 登录 Supabase
supabase login

# 3. 链接到你的项目
supabase link --project-ref jcisatfqbkswofwmugso

# 4. 部署 Edge Functions
supabase functions deploy analyze-content-b2513ebae741
supabase functions deploy fetch-url-content-b2513ebae741
```

#### 方式二：使用 Supabase Dashboard

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Edge Functions** 页面
4. 点击 **Create a new function**
5. 上传或复制函数代码

### 2. 配置环境变量

Edge Function `analyze-content-b2513ebae741` 需要以下环境变量：

- **AI_API_TOKEN_b2513ebae741**: 你的 AI API Token（用于调用 enter.pro API）

#### 设置环境变量：

**使用 Supabase CLI：**
```bash
supabase secrets set AI_API_TOKEN_b2513ebae741=your_token_here
```

**使用 Supabase Dashboard：**
1. 进入项目设置
2. 选择 **Edge Functions** > **Settings**
3. 在 **Secrets** 部分添加：
   - Key: `AI_API_TOKEN_b2513ebae741`
   - Value: 你的 API Token

### 3. 验证部署

部署完成后，使用应用中的 **"测试 Edge Function 连接"** 按钮进行验证。

### 4. 常见错误及解决方案

#### 错误 404: Edge Function 未找到
- **原因**: Edge Function 未部署
- **解决**: 按照步骤 1 部署 Edge Function

#### 错误 500: 内部服务器错误
- **原因**: 环境变量未配置或 API Token 无效
- **解决**: 
  1. 检查环境变量 `AI_API_TOKEN_b2513ebae741` 是否已设置
  2. 验证 API Token 是否有效
  3. 检查 Supabase 函数日志查看详细错误

#### 网络连接失败
- **原因**: Supabase 项目配置错误或网络问题
- **解决**: 
  1. 检查 `src/integrations/supabase/client.ts` 中的 URL 和密钥是否正确
  2. 检查网络连接
  3. 确认 Supabase 项目状态正常

### 5. 查看日志

如果问题仍然存在，查看 Edge Function 日志：

**使用 Supabase CLI：**
```bash
supabase functions logs analyze-content-b2513ebae741
```

**使用 Supabase Dashboard：**
1. 进入 **Edge Functions** 页面
2. 选择对应的函数
3. 查看 **Logs** 标签页

### 6. 本地测试（可选）

如果你想在本地测试 Edge Function：

```bash
# 启动本地 Supabase（需要 Docker）
supabase start

# 在本地运行 Edge Function
supabase functions serve analyze-content-b2513ebae741 --env-file .env.local
```

## 快速检查清单

- [ ] Edge Function 已部署到 Supabase
- [ ] 环境变量 `AI_API_TOKEN_b2513ebae741` 已配置
- [ ] API Token 有效且有权访问 enter.pro API
- [ ] Supabase 项目 URL 和密钥配置正确
- [ ] 网络连接正常
- [ ] 使用测试按钮验证连接成功

## 需要帮助？

如果按照以上步骤仍无法解决问题，请：
1. 检查浏览器控制台的详细错误信息
2. 查看 Supabase Edge Function 日志
3. 确认所有配置步骤都已正确完成
