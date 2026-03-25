import type { Logger } from "./logger";
import type { TrendingTopic } from "./topic-discovery";
import { getProviders, chatWithFallback, stripCitations } from "./ai-providers";
import {
  INSTAGRAM_BRAND_VOICE,
  INSTAGRAM_ANTI_PATTERNS,
  INSTAGRAM_POST_STRUCTURES,
  INSTAGRAM_EXAMPLE_POSTS,
  INSTAGRAM_CTA_VARIATIONS,
  pickInstagramHashtags,
} from "./instagram-brand-voice";

export async function generateInstagramCaption(
  topic: TrendingTopic,
  logger?: Logger,
  insight?: string
): Promise<string> {
  logger?.info(`Generating Instagram caption for: ${topic.title}`);

  const providers = getProviders();

  const angleStructure =
    INSTAGRAM_POST_STRUCTURES[topic.angle] ?? INSTAGRAM_POST_STRUCTURES.observation;
  const antiPatternList = INSTAGRAM_ANTI_PATTERNS.map((p) => `"${p}"`).join(", ");

  const cta =
    INSTAGRAM_CTA_VARIATIONS[
      Math.floor(Math.random() * INSTAGRAM_CTA_VARIATIONS.length)
    ];
  const ctaInstruction = cta
    ? `End with this CTA (adjust wording slightly to fit naturally): "${cta}"`
    : "End with a specific engagement question that invites the reader to share their experience.";

  const systemPrompt = `You are writing an Instagram caption. Return ONLY the caption text — no quotes, no markdown, no labels. Do NOT include citation markers like [1] or [2].

You write like a knowledgeable friend sharing a useful discovery — not a brand pushing content. Your posts feel personal and actionable.

BRAND VOICE:
${INSTAGRAM_BRAND_VOICE}

BANNED PHRASES (never use any of these):
${antiPatternList}

QUALITY SELF-CHECK — before returning, verify:
1. Does the first line stop scrolling? (Punchy, specific, no emoji)
2. Is there at least one specific stat, number, or concrete example?
3. Is it 80-120 words? (Instagram sweet spot — shorter than LinkedIn)
4. Are emojis used sparingly (3-5 max, never on the hook line)?
5. Is it free of ALL banned phrases listed above?`;

  const insightBlock = insight
    ? `\nCONCRETE INSIGHT TO BUILD THE POST AROUND:\n${insight}\n`
    : "";

  const examplesBlock = INSTAGRAM_EXAMPLE_POSTS.map(
    (ex, i) => `Example ${i + 1}:\n${ex}`
  ).join("\n\n---\n\n");

  const userPrompt = `Write an Instagram caption about: "${topic.title}"
Category: ${topic.category}
Context: ${topic.brief}
${insightBlock}
POST STRUCTURE TO FOLLOW:
${angleStructure}

RULES:
- 80-120 words (Instagram attention spans are shorter)
- Punchier hook than LinkedIn — one line, stops the scroll
- Use -> for before/after transformations
- Emojis allowed (3-5 max), but NEVER on the first line
- Every sentence must earn its place — no filler
- Must contain at least one specific, concrete tip or data point
- Use line breaks between paragraphs for readability
- Do NOT include hashtags (added separately)
- ${ctaInstruction}
- Do NOT pad with filler to reach word count — if complete at 90 words, stop

EXAMPLE POSTS (match this quality and style):

${examplesBlock}`;

  const caption = await chatWithFallback(
    systemPrompt,
    userPrompt,
    providers,
    logger
  );
  return stripCitations(caption.trim());
}

export function wrapInstagramCaption(body: string, category?: string): string {
  const hashtags = pickInstagramHashtags(category);
  return `${body}\n\n.\n.\n.\n${hashtags.join(" ")}`;
}
