// lib/pipeline/ai-provider.ts

const AI_TIMEOUT_MS = 120_000;
const MAX_RETRIES = 2;

interface AIOptions {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

interface AIResponse {
  content: string;
  model: string;
  tokensUsed?: number;
}

async function callClaude(options: AIOptions): Promise<AIResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: options.maxTokens || 16384,
      temperature: options.temperature ?? 0.5,
      system: options.systemPrompt,
      messages: [{ role: 'user', content: options.userPrompt }],
    }),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`Claude API error: ${res.status}`);
  const data = await res.json();
  return {
    content: data.content[0].text,
    model: 'claude-haiku',
    tokensUsed: data.usage?.output_tokens,
  };
}

async function callOpenAI(options: AIOptions): Promise<AIResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: options.maxTokens || 16384,
      temperature: options.temperature ?? 0.5,
      messages: [
        { role: 'system', content: options.systemPrompt },
        { role: 'user', content: options.userPrompt },
      ],
    }),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    model: 'gpt-4o-mini',
    tokensUsed: data.usage?.completion_tokens,
  };
}

export async function generateContent(options: AIOptions): Promise<AIResponse> {
  const providers = [
    ...(process.env.ANTHROPIC_API_KEY ? [callClaude] : []),
    ...(process.env.OPENAI_API_KEY ? [callOpenAI] : []),
  ];

  if (providers.length === 0) throw new Error('No AI API keys configured');

  for (const provider of providers) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await provider(options);
      } catch (err) {
        console.error(`AI attempt ${attempt + 1} failed:`, (err as Error).message);
        if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  throw new Error('All AI providers failed after retries');
}
