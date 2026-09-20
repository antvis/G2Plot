// OpenAI 兼容 LLM 客户端（默认 Moonshot）
// 配置从环境变量读取：LLM_BASE_URL / LLM_API_KEY / LLM_MODEL / LLM_TEMPERATURE
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export function createModel() {
  const baseURL = process.env.LLM_BASE_URL || 'https://api.moonshot.cn/v1';
  const apiKey = process.env.LLM_API_KEY;
  const modelId = process.env.LLM_MODEL || 'moonshot-v1-8k';

  if (!apiKey) {
    throw new Error(
      '缺少 LLM_API_KEY。请设置环境变量或创建 evals/.env 文件（参考 evals/.env.example）'
    );
  }

  const provider = createOpenAICompatible({
    name: 'eval-llm',
    baseURL,
    apiKey,
  });

  return {
    model: provider(modelId),
    modelId,
    temperature: Number(process.env.LLM_TEMPERATURE ?? 0),
  };
}
