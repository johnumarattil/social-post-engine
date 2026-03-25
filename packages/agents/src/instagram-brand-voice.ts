// Instagram brand voice — ships with WahResume values as a working example.
// Customize this file for your own brand's Instagram tone and hashtag strategy.

import type { PostAngle } from "./brand-voice";

export const INSTAGRAM_BRAND_VOICE = `TONE:
Conversational, direct, slightly playful. You're the smart friend who just figured something out and can't wait to share.
Write in second person ("you", "your") — Instagram is personal.
Short sentences. Punchy rhythm. One idea per line for scannability.
Emojis are allowed but strategic — 3-5 per post, never in the first line.

CONTENT REQUIREMENTS:
Every post MUST contain at least ONE specific, actionable tip or concrete data point.
When sharing a tip, show the before/after or the concrete transformation.
Use real numbers, percentages, or timelines when possible.

STRUCTURE (every post follows this arc):
HOOK (first line) — One punchy line that stops the scroll. No emoji on the hook.
CONTEXT (2-3 lines) — Why this matters. Keep it tight.
INSIGHT (middle section) — The meat. Specific tips, before/after examples. Use line breaks for scannability.
CTA (closing) — Save/share prompt or engagement question.

FORMATTING:
Line breaks between sections — no wall of text.
Use -> for before/after transformations.
Keep it to 80-120 words total.
No hashtags in the body (added separately in a comment block).
No bold, italic, or other markdown formatting.`;

export const INSTAGRAM_ANTI_PATTERNS = [
  "link in bio",
  "drop a comment",
  "double tap if you agree",
  "comment YES",
  "DM me",
  "who else",
  "am I right",
  "let that sink in",
  "read that again",
  "game-changer",
  "game changer",
  "in today's world",
  "the future is here",
  "gone are the days",
  "level up",
  "unlock your potential",
  "stand out from the crowd",
  "future-proof",
  "hot take",
  "unpopular opinion",
  "hear me out",
  "this is huge",
  "mind-blowing",
];

export const INSTAGRAM_POST_STRUCTURES: Record<PostAngle, string> = {
  observation: `OBSERVATION-FIRST:

HOOK: Lead with a surprising finding. "Resumes with numbers get 40% more callbacks."
One line. No fluff.

CONTEXT: 2-3 lines on why this matters.

INSIGHT: The actionable part. Show the transformation.
Use -> for before/after. Keep each point to one line.

CTA: "Save this for your next resume update" or a specific question.`,

  question: `QUESTION-HOOK:

HOOK: Open with a question the reader has wondered about.
"Why do most resumes get rejected in 7 seconds?"

CONTEXT: The common assumption, then the pivot.

INSIGHT: Answer with evidence. Show concrete comparisons.

CTA: "Share with someone who needs to hear this" or a specific question.`,

  contrarian: `CONTRARIAN-TAKE:

HOOK: Challenge common wisdom in one line.
"Stop adding a skills section to your resume."

CONTEXT: Brief — why the common advice exists.

INSIGHT: Your counter-evidence with inline proof.
Use before/after comparisons.

CTA: "Save this — you'll need it" or ask for their experience.`,

  "case-study": `MINI-CASE-STUDY:

HOOK: Start with the person and result. "She went from 0 callbacks to 6 in 2 weeks."

CONTEXT: What was wrong — be specific.

INSIGHT: What changed? Show the specific edit and result.
Use -> for the transformation.

CTA: "Tag someone who needs this" or ask for their story.`,
};

export const INSTAGRAM_EXAMPLE_POSTS = [
  `Resumes with quantified achievements get 40% more callbacks.

Most people write bullets like job descriptions. Recruiters skip those in seconds.

Here's the fix:

"Managed social media accounts"
-> "Grew LinkedIn from 2,400 to 11,000 followers in 6 months"

"Handled customer support"
-> "Resolved 94% of tickets within 24 hours, CSAT 3.2 to 4.6"

Same experience. Completely different signal.

Takes 30 minutes to rewrite your top 10 bullets. Worth every second.

Save this for your next resume update.`,

  `Two-column resumes look amazing. They also fail ATS parsing 60-70% of the time.

We tested the same resume across 6 ATS platforms:

Single-column: parsed correctly 6/6 times
Two-column: failed on 4/6 platforms

One system merged two different jobs into one entry. Another dropped the entire education section.

If you're applying through any online portal, use single-column. Save the designed version for direct emails and networking.

Share this with someone currently job hunting.`,

  `Stop listing "Python" in your skills section.

Anyone can type a skill name. There's zero proof behind it.

Instead, weave it into your bullets:

"Python" in a sidebar
-> "Built automated pipeline in Python that cut reports from 4 hours to 12 minutes"

"Project Management"
-> "Led team of 8 through launch, 2 weeks early and 15% under budget"

The skill AND the proof in one line. That's what gets callbacks.

Save this for later.`,
];

export const INSTAGRAM_CTA_VARIATIONS = [
  "Save this for later.",
  "Save this for your next resume update.",
  "Share with a friend who needs this.",
  "Tag someone who's currently job hunting.",
  "Follow @wahresume for more resume tips.",
  "Share this with someone updating their resume.",
  null, // end with engagement question instead
  null,
];

const BRANDED_HASHTAGS = ["#WahResume", "#ResumeBuilder", "#wahresume"];

const CATEGORY_HASHTAGS: Record<string, string[]> = {
  "resume-writing": [
    "#ResumeTips", "#ResumeHelp", "#ResumeWriting", "#CVTips",
    "#JobSearchTips", "#ResumeAdvice", "#ResumeMakeover",
  ],
  "job-search": [
    "#JobSearch", "#JobHunting", "#NowHiring", "#JobSeekers",
    "#JobTips", "#CareerMove", "#OpenToWork",
  ],
  "interview-prep": [
    "#InterviewTips", "#InterviewPrep", "#JobInterview",
    "#InterviewSkills", "#MockInterview", "#InterviewAdvice",
  ],
  "career-growth": [
    "#CareerAdvice", "#CareerCoach", "#CareerDevelopment",
    "#ProfessionalGrowth", "#CareerGoals", "#Promotion",
  ],
  "cover-letter": [
    "#CoverLetter", "#CoverLetterTips", "#JobApplication",
    "#HiringManager", "#ApplicationTips",
  ],
};

const GENERAL_CAREER_POOL = [
  "#CareerAdvice", "#JobHunt", "#HiringTips", "#InterviewTips",
  "#CareerCoach", "#JobSeeker", "#LinkedInTips", "#WorkLife",
  "#CareerTips", "#ProfessionalDevelopment", "#JobMarket",
  "#HiringNow", "#Recruitment", "#WorkFromHome",
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickInstagramHashtags(category?: string): string[] {
  const branded = BRANDED_HASHTAGS.slice(0, 3);
  const catPool = category ? CATEGORY_HASHTAGS[category] ?? [] : [];
  const catTags = shuffle(catPool).slice(0, 7);
  const generalTags = shuffle(GENERAL_CAREER_POOL).slice(0, 10);

  // Combine, deduplicate, cap at 20
  const all = [...branded, ...catTags, ...generalTags];
  const unique = [...new Set(all)];
  return unique.slice(0, 20);
}
