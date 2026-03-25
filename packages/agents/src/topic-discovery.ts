import type { Logger } from "./logger";
import {
  getProviders,
  chatWithFallback,
  stripCitations,
  cleanJsonResponse,
} from "./ai-providers";
import { LAYOUT_CONTENT_PROMPTS } from "@social-post-engine/shared";
import {
  BRAND_VOICE,
  ANTI_PATTERNS,
  BANNED_TITLE_WORDS,
  POST_STRUCTURES,
  EXAMPLE_POSTS,
  CTA_VARIATIONS,
  type PostAngle,
} from "./brand-voice";

export interface TrendingTopic {
  title: string;
  subtitle: string;
  category: string;
  brief: string;
  angle: PostAngle;
}

// --------------- Citation Stripping ---------------

function stripCitationsDeep(obj: Record<string, unknown>): void {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === "string") {
      obj[key] = stripCitations(val);
    } else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (typeof val[i] === "string") {
          val[i] = stripCitations(val[i] as string);
        } else if (val[i] && typeof val[i] === "object") {
          stripCitationsDeep(val[i] as Record<string, unknown>);
        }
      }
    } else if (val && typeof val === "object") {
      stripCitationsDeep(val as Record<string, unknown>);
    }
  }
}

// --------------- Deduplication ---------------

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
}

function isTooSimilar(a: string, b: string, threshold = 0.6): boolean {
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);
  if (tokensA.size === 0 || tokensB.size === 0) return false;

  let overlap = 0;
  for (const word of tokensA) {
    if (tokensB.has(word)) overlap++;
  }

  const similarity = overlap / Math.min(tokensA.size, tokensB.size);
  return similarity >= threshold;
}

function deduplicateTopics(
  topics: TrendingTopic[],
  previousTitles: string[]
): TrendingTopic[] {
  const kept: TrendingTopic[] = [];
  const allTitles = [...previousTitles];

  for (const topic of topics) {
    const isDuplicate = allTitles.some((prev) =>
      isTooSimilar(topic.title, prev)
    );
    if (!isDuplicate) {
      kept.push(topic);
      allTitles.push(topic.title);
    }
  }

  return kept;
}

// --------------- Public API ---------------

export async function discoverTopics(
  count: number,
  logger?: Logger,
  previousTitles?: string[]
): Promise<TrendingTopic[]> {
  logger?.info(`Discovering ${count} trending topics`);

  const providers = getProviders();

  const bannedWords = BANNED_TITLE_WORDS.map((w) => `"${w}"`).join(", ");
  const prevTitlesList =
    previousTitles && previousTitles.length > 0
      ? `\n\nALREADY USED TITLES (do NOT repeat or closely paraphrase these):\n${previousTitles.map((t) => `- ${t}`).join("\n")}`
      : "";

  const systemPrompt = `You are a career content strategist who specializes in specific, actionable LinkedIn content. Return ONLY valid JSON — no markdown fences, no explanation.`;

  const userPrompt = `Find ${count} specific, narrow-angle topics about resume writing, job search, or career development that are relevant right now.

CRITICAL RULES FOR TITLES:
- Each title must be about ONE specific, concrete thing — not a broad theme
- Titles should make the reader think "oh, I didn't know that" or "wait, really?"
- BANNED words in titles: ${bannedWords}

GOOD title examples (specific, narrow, actionable):
- "Why Two-Column Resumes Fail ATS Scans"
- "The One Resume Bullet Format That Gets Callbacks"
- "Stop Listing Skills Without Context"
- "What Happens When a Recruiter Spends 7 Seconds on Your Resume"

BAD title examples (too broad, too buzzy — DO NOT write titles like these):
- "The Rise of AI in Job Search"
- "Mastering Your Career in 2026"
- "Essential Resume Tips for Success"
- "Future-Proofing Your Career Path"

For each topic, provide:
- title: specific, narrow post title (max 60 chars)
- subtitle: a supporting line that adds concrete context (max 80 chars)
- category: one of "job-search", "resume-writing", "interview-prep", "career-growth", "cover-letter"
- brief: 1-sentence summary of the specific insight or angle
- angle: one of "observation", "question", "contrarian", "case-study" — pick the angle that best fits the topic

Distribute angles evenly across topics when possible.
${prevTitlesList}

Return a JSON array: [{"title":"...","subtitle":"...","category":"...","brief":"...","angle":"..."}]`;

  const raw = await chatWithFallback(systemPrompt, userPrompt, providers, logger, {
    useWebSearch: true,
  });

  const cleaned = cleanJsonResponse(raw);

  let topics: TrendingTopic[];
  try {
    topics = JSON.parse(cleaned) as TrendingTopic[];
  } catch (err) {
    logger?.error("Failed to parse AI response", {
      raw,
      err: String(err),
    });
    throw new Error(`Failed to parse topics JSON: ${err}`);
  }

  // Validate required fields and angle
  const validAngles: PostAngle[] = ["observation", "question", "contrarian", "case-study"];
  topics = topics.filter(
    (t) =>
      t.title &&
      t.subtitle &&
      t.category &&
      t.brief &&
      t.angle &&
      validAngles.includes(t.angle)
  );

  // Deduplicate against previous titles
  if (previousTitles && previousTitles.length > 0) {
    topics = deduplicateTopics(topics, previousTitles);
  }

  logger?.info(`Discovered ${topics.length} topics`, {
    titles: topics.map((t) => `[${t.angle}] ${t.title}`),
  });

  return topics.slice(0, count);
}

// --------------- Pass 1: Insight Extraction ---------------

export async function generateInsight(
  topic: TrendingTopic,
  logger?: Logger
): Promise<string> {
  logger?.info(`Extracting insight for: ${topic.title}`);

  const providers = getProviders();

  const systemPrompt = `You are a career research assistant. Find ONE specific, concrete, factual insight related to the topic. Return ONLY the insight — 2-4 sentences of pure substance. No fluff, no intro, no conclusion. Do NOT include citation markers like [1] or [2].`;

  const userPrompt = `Topic: "${topic.title}"
Context: ${topic.brief}

Search for a specific data point, statistic, real example, or concrete finding related to this topic. Something a reader would find genuinely useful or surprising.

Examples of good insights:
- "LinkedIn data shows resumes with quantified achievements get 40% more callbacks than those with duty-based bullets."
- "Most ATS systems parse single-column layouts correctly 95% of the time, but two-column layouts fail parsing 60-70% of the time."
- "A 2024 study by Jobscan found that resumes matching 80%+ of job description keywords pass ATS screening 3x more often."

Return ONLY the insight (2-4 sentences). No labels, no markdown.`;

  const insight = await chatWithFallback(
    systemPrompt,
    userPrompt,
    providers,
    logger,
    { useWebSearch: true }
  );
  return stripCitations(insight.trim());
}

// --------------- Layout Picker ---------------

const ALL_LAYOUTS = [
  "linkedin-profile",
  "before-after",
  "checklist", "myth-reality",
  "accent-sidebar", "grid-points",
];

const LAYOUT_DESCRIPTIONS: Record<string, string> = {
  "linkedin-profile": "LinkedIn profile mockup — LinkedIn or profile optimization tips",
  "before-after": "Side-by-side before/after comparison cards — transformation stories",
  "checklist": "Checklist with checkboxes — step-by-step or multi-point advice",
  "myth-reality": "Myth vs reality split — debunking misconceptions",
  "accent-sidebar": "Split editorial — left accent panel with bold statement, right panel with complementary point",
  "grid-points": "Grid of points/cards — multi-factor analysis or comparisons",

};

export function getAllLayouts(): string[] {
  return [...ALL_LAYOUTS];
}

export async function pickLayout(
  topic: TrendingTopic,
  layoutUsageCounts: Record<string, number>,
  logger?: Logger
): Promise<string> {
  logger?.info(`Picking layout for: ${topic.title}`);

  const providers = getProviders();

  // Build usage context so AI favors underused layouts
  const usageLines = ALL_LAYOUTS.map((l) => {
    const count = layoutUsageCounts[l] ?? 0;
    return `  ${l} (used ${count}x): ${LAYOUT_DESCRIPTIONS[l]}`;
  }).join("\n");

  const systemPrompt = `You are a visual design selector for social media post images. Return ONLY the layout name — nothing else. No quotes, no explanation.`;

  const userPrompt = `Pick the single best layout template for this post:

Title: "${topic.title}"
Subtitle: "${topic.subtitle}"
Category: ${topic.category}
Angle: ${topic.angle}

Available layouts (with current usage counts — prefer underused ones when multiple layouts fit equally well):
${usageLines}

Rules:
- Pick the layout whose visual style best matches the content
- If title is about myths/misconceptions, prefer "myth-reality"
- If title is about LinkedIn specifically, prefer "linkedin-profile"
- If title involves a before/after transformation, prefer "before-after"
- If title is a multi-point list or checklist, prefer "checklist"
- When multiple layouts fit equally, pick the one with the LOWEST usage count
- Return ONLY the layout name, nothing else`;

  try {
    const raw = await chatWithFallback(systemPrompt, userPrompt, providers, logger);
    const picked = raw.trim().replace(/['"]/g, "");

    if (ALL_LAYOUTS.includes(picked)) {
      logger?.info(`AI picked layout: ${picked}`);
      return picked;
    }

    // Fuzzy match — AI might return close variant
    const match = ALL_LAYOUTS.find((l) => picked.includes(l) || l.includes(picked));
    if (match) {
      logger?.info(`AI picked layout (fuzzy matched): ${match}`);
      return match;
    }

    logger?.warn(`AI returned invalid layout "${picked}", falling back to random`);
  } catch (err) {
    logger?.warn(`Layout picker failed, falling back to random: ${err}`);
  }

  // Fallback: pick the least-used layout
  const sorted = [...ALL_LAYOUTS].sort(
    (a, b) => (layoutUsageCounts[a] ?? 0) - (layoutUsageCounts[b] ?? 0)
  );
  return sorted[0];
}

// --------------- Layout Data Generation ---------------

export async function generateLayoutData(
  topic: TrendingTopic,
  layout: string,
  logger?: Logger
): Promise<Record<string, unknown> | undefined> {
  const prompt = LAYOUT_CONTENT_PROMPTS[layout as keyof typeof LAYOUT_CONTENT_PROMPTS];
  if (!prompt) {
    return undefined;
  }

  logger?.info(`Generating layout data for: ${layout}`);

  const providers = getProviders();

  const systemPrompt = `You generate structured content for social media post images. Return ONLY valid JSON — no markdown fences, no explanation.`;

  const userPrompt = `Topic: "${topic.title}"
Subtitle: "${topic.subtitle}"
Category: ${topic.category}
Context: ${topic.brief}

${prompt}`;

  try {
    const raw = await chatWithFallback(systemPrompt, userPrompt, providers, logger);
    const cleaned = cleanJsonResponse(raw);
    const data = JSON.parse(cleaned) as Record<string, unknown>;
    // Strip citation markers from all string values in layout data
    stripCitationsDeep(data);
    logger?.info(`Layout data generated for ${layout}`, { keys: Object.keys(data) });
    return data;
  } catch (err) {
    logger?.warn(`Layout data generation failed for ${layout}, falling back to defaults: ${err}`);
    return undefined;
  }
}

// --------------- Pass 2: Caption Generation ---------------

export async function generateCaption(
  topic: TrendingTopic,
  logger?: Logger,
  insight?: string
): Promise<string> {
  logger?.info(`Generating caption for: ${topic.title}`);

  const providers = getProviders();

  const angleStructure = POST_STRUCTURES[topic.angle] ?? POST_STRUCTURES.observation;
  const antiPatternList = ANTI_PATTERNS.map((p) => `"${p}"`).join(", ");

  // Pick a random CTA (or null for no CTA)
  const cta = CTA_VARIATIONS[Math.floor(Math.random() * CTA_VARIATIONS.length)];
  const ctaInstruction = cta
    ? `End with this CTA (adjust wording slightly to fit naturally): "${cta}"`
    : "Do NOT include any call-to-action. Let the insight stand on its own.";

  const systemPrompt = `You are writing a LinkedIn post. Return ONLY the post text — no quotes, no markdown, no labels. Do NOT include citation markers like [1] or [2].

You write like a knowledgeable career coach who shares real data — not a marketing team producing content. Your posts read like something a respected colleague would share, not something a brand would publish.

BRAND VOICE:
${BRAND_VOICE}

BANNED PHRASES (never use any of these):
${antiPatternList}

QUALITY SELF-CHECK — before returning, verify:
1. Does the first line stop scrolling? (Would YOU click "...see more"?)
2. Is there at least one specific stat, number, or concrete example?
3. Does it follow the HOOK -> CONTEXT -> INSIGHT -> CTA arc?
4. Would a real person post this? (Not a marketing department)
5. Is it free of ALL banned phrases listed above?`;

  const insightBlock = insight
    ? `\nCONCRETE INSIGHT TO BUILD THE POST AROUND:\n${insight}\n`
    : "";

  const examplesBlock = EXAMPLE_POSTS.map((ex, i) => `Example ${i + 1}:\n${ex}`).join(
    "\n\n---\n\n"
  );

  const userPrompt = `Write a LinkedIn post about: "${topic.title}"
Category: ${topic.category}
Context: ${topic.brief}
${insightBlock}
POST STRUCTURE TO FOLLOW:
${angleStructure}

RULES:
- 200-280 words (substantial but tight — LinkedIn data shows this range gets 47% higher engagement)
- Follow the HOOK -> CONTEXT -> INSIGHT -> CTA arc described in the brand voice
- The FIRST 2-3 lines are critical — they must stop the scroll (this is all that shows before "...see more")
- Use -> for before/after transformations (e.g. "Managed a team" -> "Led 5-person team that shipped $2M feature")
- End with a question that invites the reader to share their experience
- Every sentence must earn its place — no throat-clearing, no filler
- Must contain at least one specific, concrete tip or data point
- Use line breaks between paragraphs for readability
- Do NOT include hashtags (added separately)
- ${ctaInstruction}
- No emojis
- Do NOT pad with filler to reach the word count — if the post is complete at 220 words, stop

EXAMPLE POSTS (match this quality and specificity):

${examplesBlock}`;

  const caption = await chatWithFallback(
    systemPrompt,
    userPrompt,
    providers,
    logger
  );
  return stripCitations(caption.trim());
}
