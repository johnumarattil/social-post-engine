/**
 * Brand voice guide — ships with WahResume values as a working example.
 * Customize this file for your own brand's tone, content rules, and examples.
 *
 * Imported by topic-discovery.ts for caption generation prompts.
 */

export const BRAND_VOICE = `TONE:
Knowledgeable peer sharing what they learned, not a brand lecturing.
Use first person plural ("we", "our") naturally — we're in the trenches with the reader.
Write like you're telling a colleague something useful over coffee, not pitching from a stage.
Sentences vary in length. Mostly short and punchy, but occasional longer ones for flow.

CONTENT REQUIREMENTS:
Every post MUST contain at least ONE specific, actionable tip or concrete data point.
When sharing a tip, show the before/after or the concrete transformation.
Use real numbers, percentages, or timelines — vague claims ("many recruiters say...") are banned.

STRUCTURE (every post follows this arc):
HOOK (first 2-3 lines) — Bold claim, surprising stat, or direct question. This is the only part visible before "...see more." It must stop the scroll.
CONTEXT (3-5 lines) — Set up the problem or backstory. Why does this matter? Who does it affect?
INSIGHT (middle section, scannable) — The meat. Specific tips, before/after examples, data points. Use short paragraphs and line breaks for scannability.
CTA (closing) — End with a question that invites the reader to share their experience. Make it specific enough that people actually want to answer.

FORMATTING:
Blank lines between sections — no wall of text.
Use -> for before/after transformations.
Keep paragraphs to 1-3 sentences each.
No emojis. No hashtags in the body (added separately).
No bold, italic, or other markdown formatting.`;

export const ANTI_PATTERNS = [
  "seismic shift",
  "isn't just",
  "not just",
  "it's not just",
  "game-changer",
  "game changer",
  "non-negotiable",
  "relentless",
  "in today's competitive landscape",
  "in today's world",
  "in today's job market",
  "hyper-competitive",
  "the future is here",
  "gone are the days",
  "evolving landscape",
  "the landscape",
  "fast-paced world",
  "paradigm shift",
  "fundamental shift",
  "level up",
  "take your career to the next level",
  "unlock your potential",
  "stand out from the crowd",
  "make your mark",
  "don't get left behind",
  "the secret to",
  "you won't believe",
  "here's the thing",
  "let that sink in",
  "read that again",
  "future-proof",
  "future proof",
  "rapidly evolving",
  "unprecedented",
  "cutting-edge",
  "cutting edge",
  "imagine walking into",
  "the future of",
  "survive but thrive",
  "not just survive",
  "value proposition",
  "at the end of the day",
  "it goes without saying",
  "needless to say",
  "it's no secret",
  "the reality is",
  "the truth is",
  "here's why",
  "spoiler alert",
  "pro tip",
  "hot take",
  "unpopular opinion",
  "hear me out",
  "let's be honest",
  "can we talk about",
  "I'll say it louder",
  "this is huge",
  "mind-blowing",
  "a wake-up call",
  "the bottom line",
  "food for thought",
  "think about it",
  "wrap your head around",
  "no brainer",
  "no-brainer",
  "leverage your",
  "navigate the",
  "harness the power",
  "empower yourself",
  "elevate your",
  "transform your",
  "revolutionize",
];

export const BANNED_TITLE_WORDS = [
  "2026",
  "2025",
  "future-proof",
  "futureproof",
  "master",
  "mastering",
  "essential",
  "ultimate",
  "definitive",
  "comprehensive",
  "complete guide",
  "everything you need",
  "game-changing",
];

export type PostAngle = "observation" | "question" | "contrarian" | "case-study";

export const POST_STRUCTURES: Record<PostAngle, string> = {
  observation: `OBSERVATION-FIRST:

HOOK: Lead with the finding. "We looked at X and found Y." or "X% of resumes that get callbacks have one thing in common."
Make it specific — a number, a pattern, a before/after.

CONTEXT: What were you looking at? Why? Set the scene in 2-3 lines.
"We reviewed 200 resumes that came through WahResume last quarter" is better than "resumes are important."

INSIGHT: Break the finding into scannable chunks.
Use -> for transformations: "Managed a team" -> "Led 5-person team that shipped $2M feature 3 weeks early"
Use short paragraphs. Each chunk should deliver one clear point.

CTA: Close with a specific question about the reader's experience.
"What's the strongest bullet on your resume right now?" not "What do you think?"`,

  question: `QUESTION-HOOK:

HOOK: Open with a genuine question the reader has likely wondered about.
"Why do 70% of resumes with skill bars get auto-rejected?" or "What happens when a recruiter spends 7 seconds on your resume?"

CONTEXT: Acknowledge the common assumption. "Most people think X..." or "The standard advice is to..."
Then pivot: "But when we actually tested this..."

INSIGHT: Answer the question with evidence. Show the test, the data, the comparison.
Use concrete examples — side-by-side format works well.
"Single-column: parsed correctly 6/6. Two-column: failed 4/6."

CTA: Close with a question that connects back to the reader's own experience.
"Has your resume format ever cost you an opportunity?"`,

  contrarian: `CONTRARIAN-TAKE:

HOOK: State the common belief, then challenge it immediately.
"'Add a skills section' is the most common resume advice. It's also the least useful." or "Everyone says to customize every resume. We tracked 200 applications and found the opposite."

CONTEXT: Briefly explain why the common wisdom exists and why people follow it.
1-2 lines is enough — don't build a straw man.

INSIGHT: Present your counter-evidence. Show the alternative with inline proof.
"Built automated data pipeline in Python, cutting report generation from 4 hours to 12 minutes" proves Python better than a skills list ever could.
Use before/after or side-by-side comparisons.

CTA: Ask the reader about their own experience with the conventional wisdom.
"What skill do you struggle to prove with evidence?"`,

  "case-study": `MINI-CASE-STUDY:

HOOK: Start with the person and their situation. Keep it tight.
"A product manager came to us after 3 months of silence from applications." or "She had 8 years of experience and zero callbacks."

CONTEXT: What was the problem? Be specific about what was wrong — not vague.
"Every bullet started with 'Responsible for'" is concrete. "Her resume needed work" is not.

INSIGHT: What changed? Show the specific edit and the result.
"Responsible for managing product roadmap" -> "Defined and shipped 12-feature roadmap that grew MAU from 40K to 120K"
Then the outcome: "6 callbacks in 2 weeks."

CTA: Ask for the reader's own transformation story.
"What was the one resume change that made the biggest difference for you?"`,
};

export const EXAMPLE_POSTS = [
  `We reviewed 200 resumes that came through WahResume last quarter.

The ones that landed interviews had one pattern in common: every bullet proved a result, not just described a task.

Here's what the difference looks like in practice:

"Managed social media accounts for the marketing department"
-> "Grew LinkedIn following from 2,400 to 11,000 in 6 months, generating 35% of inbound leads"

"Responsible for onboarding new team members"
-> "Built onboarding program that cut ramp-up time from 8 weeks to 3, adopted across 4 departments"

"Handled customer support tickets"
-> "Resolved 94% of tickets within 24 hours, improving CSAT score from 3.2 to 4.6"

Same experience. Completely different signal.

The fix takes about 30 minutes. Go through your last 3 roles and rewrite every bullet using this format: [Action verb] + [what you did] + [measurable result].

If you don't have exact numbers, estimate conservatively. "Reduced processing time by roughly 30%" still beats "Was in charge of process improvement."

What's the strongest bullet on your resume right now?`,

  `Why do two-column resumes keep getting rejected — even when they look great?

It's not a design preference. It's a parsing problem.

Most ATS systems read documents left-to-right, top-to-bottom in a single stream. A two-column layout scrambles that order. Your job title ends up next to a random skill. Your dates float into the wrong section.

We ran the same resume through 6 popular ATS platforms to see how bad it actually is:

Single-column layout: parsed correctly 6 out of 6 times.
Two-column layout: failed parsing on 4 out of 6 platforms.

The failures weren't subtle either. One system merged two different jobs into a single entry. Another dropped the entire education section.

The frustrating part is that two-column resumes often look more polished to human eyes. But if the ATS can't read it, no human ever will.

The rule is simple: if you're applying through any online portal, use a single-column layout. Save the designed version for the PDF you email directly or hand to someone at a networking event.

Has your resume format ever cost you an opportunity?`,

  `"Add a skills section" is the most common resume advice out there. It's also the least useful.

A standalone skills list tells a recruiter almost nothing. Anyone can type "Python" or "Project Management" or "Cross-functional Leadership." There's zero proof behind it.

Here's what actually works: weave skills into your experience bullets.

Instead of listing "Python" in a sidebar:
-> "Built automated data pipeline in Python that cut report generation from 4 hours to 12 minutes"

Instead of listing "Project Management":
-> "Led cross-functional team of 8 through product launch, delivering 2 weeks ahead of schedule and 15% under budget"

Instead of listing "Data Analysis":
-> "Analyzed 3 years of customer churn data, identified 2 key drop-off points, and proposed fixes that reduced churn by 18%"

Now the recruiter sees the skill AND the proof in a single line. That's the difference between a keyword match and a compelling candidate.

The skills section itself isn't harmful — keep it if you want for ATS keyword matching. But the real selling happens in your bullets.

What skill do you struggle to prove with evidence on your resume?`,

  `A product manager came to us after 3 months of zero callbacks. She had 8 years of experience at solid companies. On paper, she should have been getting interviews.

The problem was obvious within 30 seconds. Every single bullet started with "Responsible for."

"Responsible for managing product roadmap"
"Responsible for stakeholder communication"
"Responsible for sprint planning and backlog grooming"

These describe a job description, not a person who did the job well. A recruiter scanning this has no idea whether she was great or just present.

We rewrote every bullet to show what actually happened:

"Responsible for managing product roadmap"
-> "Defined and shipped 12-feature roadmap that grew MAU from 40K to 120K in 9 months"

"Responsible for stakeholder communication"
-> "Ran weekly exec syncs across 3 business units, cutting cross-team blockers by 60%"

"Responsible for sprint planning"
-> "Introduced story-point estimation that improved sprint completion rate from 65% to 92%"

Same person. Same experience. Completely different story.

She got 6 callbacks in the first 2 weeks after updating.

What was the one resume change that made the biggest difference for you?`,
];

export const CTA_VARIATIONS = [
  null, // no CTA — posts now end with engagement questions naturally
  null, // weighted toward no CTA to avoid ad feel
  "We built a free tool at wahresume.com that helps with exactly this.",
  "If you want to try this approach, wahresume.com walks you through it step by step.",
  "We've baked this into wahresume.com — takes about 10 minutes to apply.",
  "More tactics like this on our blog at wahresume.com.",
];
