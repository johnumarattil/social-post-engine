// Per-layout data interfaces
export interface ChecklistData { items: { text: string; checked: boolean }[] }
export interface GridPointsData { points: { label: string; description: string }[] }
export interface MythRealityData { title?: string; myths: string[]; realities: string[] }
export interface BeforeAfterData { beforePoints: string[]; afterPoints: string[] }
export interface LinkedinProfileData { profileName?: string; headline?: string; location?: string; aboutSnippet?: string }

export interface AccentSidebarData { title1: string; sub1?: string; title2: string; sub2?: string }

export interface StatHighlightData { stats: { value: string; label: string; description?: string }[]; source?: string }

export interface ChartData { chartType: "bar" | "line"; items: { label: string; value: number; highlight?: boolean }[]; yLabel?: string; source?: string }

export type LayoutDataMap = {
  "checklist": ChecklistData;
  "grid-points": GridPointsData;
  "myth-reality": MythRealityData;
  "before-after": BeforeAfterData;
  "linkedin-profile": LinkedinProfileData;

  "accent-sidebar": AccentSidebarData;
  "stat-highlight": StatHighlightData;
  "chart": ChartData;
};

export type LayoutName = keyof LayoutDataMap;

// Sub-prompt for each layout — null means no AI call needed
export const LAYOUT_CONTENT_PROMPTS: Record<LayoutName, string | null> = {
  "checklist": `Generate 4 checklist items related to the topic. Each is a short actionable task (6-10 words). Mark 2 as checked and 2 as unchecked. Return JSON: {"items":[{"text":"...","checked":true/false},...]}`,
  "grid-points": `Generate exactly 4 key points. Each has a short label (2-4 words) and a one-sentence description (8-15 words). Return JSON: {"points":[{"label":"...","description":"..."},...]}`,
  "myth-reality": `Rewrite the topic as myth vs reality lists. Generate a short punchy title (2-4 words, e.g. "Job Search Myths", "Resume Myths"). Generate 2-3 common myths (misconceptions, 4-10 words each) and 2-3 matching realities (the truth, 4-10 words each). Keep them punchy and concise. Return JSON: {"title":"...","myths":["...","..."],"realities":["...","..."]}`,
  "before-after": `Generate 3 before/after points. Before = wrong approach (4-8 words each). After = correct approach (4-8 words each). Return JSON: {"beforePoints":[...],"afterPoints":[...]}`,
  "linkedin-profile": `Generate a fictional LinkedIn profile relevant to the topic. Name, headline (under 60 chars), location (City, ST), 1-sentence about snippet. Return JSON: {"profileName":"...","headline":"...","location":"...","aboutSnippet":"..."}`,

  "accent-sidebar": `Generate two complementary points for a split-panel editorial image. title1 is the bold main statement (3-8 words, punchy). sub1 is a supporting detail for the left panel (8-15 words). title2 is the second panel's statement (3-8 words). sub2 is its supporting detail (8-15 words). The two panels should present different angles on the same topic — not repeat each other. Return JSON: {"title1":"...","sub1":"...","title2":"...","sub2":"..."}`,
  "stat-highlight": `Generate exactly 3 statistics related to the topic. Each stat has a value (a number with unit like "75%", "8s", "3x", "250+", "$500K"), a short label (2-4 words), and an optional description (5-10 words). Optionally include a source attribution. Return JSON: {"stats":[{"value":"...","label":"...","description":"..."},...],"source":"..."}`,
  "chart": `Generate chart data for a visual data story related to the topic. Choose "bar" for ranked comparisons (5 items, percentage values, mark the most important one with highlight:true) or "line" for trends over time (5-6 data points, numeric values, mark the final point with highlight:true). Include a yLabel and source. Return JSON: {"chartType":"bar"|"line","items":[{"label":"...","value":number,"highlight":true/false},...],"yLabel":"...","source":"..."}`,
};

/** Layouts that should NOT receive a subtitle — title-only designs */
export const LAYOUTS_NO_SUBTITLE: readonly LayoutName[] = ["myth-reality"];
