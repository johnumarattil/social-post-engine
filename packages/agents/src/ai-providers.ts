import type { Logger } from "./logger";

export interface AiProvider {
  name: string;
  chatCompletion(
    systemPrompt: string,
    userPrompt: string,
    options?: { useWebSearch?: boolean }
  ): Promise<string>;
}

// --------------- Perplexity Provider ---------------

export function perplexityProvider(): AiProvider {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) throw new Error("PERPLEXITY_API_KEY is not set");

  return {
    name: "Perplexity Sonar",
    async chatCompletion(systemPrompt, userPrompt) {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Perplexity API error ${res.status}: ${body}`);
      }

      const json = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      return json.choices[0].message.content;
    },
  };
}

// --------------- Gemini Provider ---------------

export function geminiProvider(): AiProvider {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");

  return {
    name: "Gemini Flash",
    async chatCompletion(systemPrompt, userPrompt, options) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

      const body: Record<string, unknown> = {
        contents: [
          {
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
          },
        ],
        generationConfig: { temperature: 0.7 },
      };

      // Add Google Search grounding when requested (for topic discovery)
      if (options?.useWebSearch) {
        body.tools = [{ google_search: {} }];
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Gemini API error ${res.status}: ${errBody}`);
      }

      const json = (await res.json()) as {
        candidates: { content: { parts: { text: string }[] } }[];
      };
      return json.candidates[0].content.parts[0].text;
    },
  };
}

// --------------- Fallback Logic ---------------

export function getProviders(): AiProvider[] {
  const providers: AiProvider[] = [];

  if (process.env.PERPLEXITY_API_KEY) {
    try {
      providers.push(perplexityProvider());
    } catch {
      // key missing, skip
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      providers.push(geminiProvider());
    } catch {
      // key missing, skip
    }
  }

  if (providers.length === 0) {
    throw new Error(
      "No AI provider configured. Set PERPLEXITY_API_KEY and/or GEMINI_API_KEY."
    );
  }

  return providers;
}

export async function chatWithFallback(
  systemPrompt: string,
  userPrompt: string,
  providers: AiProvider[],
  logger?: Logger,
  options?: { useWebSearch?: boolean }
): Promise<string> {
  const errors: string[] = [];

  for (const provider of providers) {
    try {
      logger?.info(`Trying ${provider.name}...`);
      const result = await provider.chatCompletion(
        systemPrompt,
        userPrompt,
        options
      );
      logger?.info(`${provider.name} succeeded`);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger?.warn(`${provider.name} failed: ${msg}`);
      errors.push(`${provider.name}: ${msg}`);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join("\n")}`);
}

// --------------- Strip Citations ---------------

export function stripCitations(text: string): string {
  return text.replace(/\[\d+\]/g, "").replace(/ {2,}/g, " ").trim();
}

// --------------- Clean JSON ---------------

export function cleanJsonResponse(raw: string): string {
  return raw
    .replace(/```(?:json)?\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
}
