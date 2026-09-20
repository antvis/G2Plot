// OpenAI-compatible LLM client (defaults to Moonshot).
// Config is read from env: LLM_BASE_URL / LLM_API_KEY / LLM_MODEL / LLM_TEMPERATURE.
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export function createModel() {
  const baseURL = process.env.LLM_BASE_URL || 'https://api.moonshot.cn/v1';
  const apiKey = process.env.LLM_API_KEY;
  const modelId = process.env.LLM_MODEL || 'moonshot-v1-8k';

  if (!apiKey) {
    throw new Error(
      'Missing LLM_API_KEY. Set the environment variable or create evals/.env (see evals/.env.example).'
    );
  }

  const provider = createOpenAICompatible({
    name: 'eval-llm',
    baseURL,
    apiKey,
  });

  return {
    model: provider(modelId),
    temperature: Number(process.env.LLM_TEMPERATURE ?? 0),
  };
}
