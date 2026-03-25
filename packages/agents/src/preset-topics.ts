// Preset topics — ships with WahResume career/resume topics as a working example.
// Replace with your own brand's topic list.

import type { PostAngle } from "./brand-voice";

export interface PresetTopic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  angle: PostAngle;
  layout?: string;
  beforePoints?: string[];
  afterPoints?: string[];
}

export const PRESET_TOPICS: PresetTopic[] = [
  // ═══════════════════════════════════════════════════════════════════
  // LINKEDIN — 90 topics (3/day × 30 days, 9 AM publish)
  // Each day: 1 myth-reality + 2 variety layouts
  // ═══════════════════════════════════════════════════════════════════

  // ─── Day 1: Resume Foundations ────────────────────────────────────
  {
    id: "li-d01-one-page",
    title: "One-Page Resumes Are Not a Rule",
    subtitle: "When two pages actually help your candidacy",
    category: "resume-writing",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d01-remove-checklist",
    title: "5 Resume Mistakes That Kill Your First Impression",
    subtitle: "Quick fixes that make an immediate difference",
    category: "resume-writing",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d01-bullets-ba",
    title: "Duty-Based Bullets vs Impact Bullets",
    subtitle: "The rewrite that doubles callbacks",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Responsible for managing team", "Handled customer accounts", "Assisted with projects"],
    afterPoints: ["Led 8-person team to 130% quota", "Grew accounts by $2.4M ARR", "Shipped 3 features in 6 weeks"],
  },

  // ─── Day 2 ────────────────────────────────────────────────────────
  {
    id: "li-d02-ats-reject",
    title: "ATS Systems Don't Reject Resumes",
    subtitle: "They rank — recruiters reject",
    category: "resume-writing",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d02-ats-grid",
    title: "How ATS Actually Ranks Your Resume",
    subtitle: "The 4 signals that determine your score",
    category: "resume-writing",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d02-column-ba",
    title: "Single-Column vs Two-Column Resume",
    subtitle: "One passes ATS — the other doesn't",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Creative two-column design", "Icons instead of labels", "4 months, zero callbacks"],
    afterPoints: ["Clean single-column layout", "Standard section headings", "3 interviews in 2 weeks"],
  },

  // ─── Day 3 ────────────────────────────────────────────────────────
  {
    id: "li-d03-cover-letters",
    title: "Do Cover Letters Still Matter?",
    subtitle: "68% of hiring managers say yes — when they're good",
    category: "cover-letter",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d03-cl-checklist",
    title: "Cover Letter Quick Wins Checklist",
    subtitle: "6 fixes before you hit send",
    category: "cover-letter",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d03-cl-sidebar",
    title: "What Hiring Managers See vs What You Write",
    subtitle: "The perception gap in cover letters",
    category: "cover-letter",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 4 ────────────────────────────────────────────────────────
  {
    id: "li-d04-skills-sections",
    title: "Skills Sections Don't Prove Anything",
    subtitle: "Anyone can type Python — show the proof",
    category: "resume-writing",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d04-skills-grid",
    title: "4 Skills Section Formats Ranked",
    subtitle: "From worst to best for ATS and humans",
    category: "resume-writing",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d04-skills-ba",
    title: "Vague Skills List vs Contextual Skills",
    subtitle: "Show don't tell — applied to resume skills",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Python", "Leadership", "Communication"],
    afterPoints: ["Built Python ETL processing 2M rows/day", "Led 12-person team through reorg", "Presented quarterly to C-suite of 200"],
  },

  // ─── Day 5 ────────────────────────────────────────────────────────
  {
    id: "li-d05-photo-resume",
    title: "Should You Include a Photo on Your Resume?",
    subtitle: "The answer depends on where you're applying",
    category: "resume-writing",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d05-photo-grid",
    title: "Resume Photo Rules by Country",
    subtitle: "Required in Germany, risky in the US",
    category: "resume-writing",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d05-eu-us-sidebar",
    title: "European Resume vs American Resume",
    subtitle: "Same job — different document",
    category: "resume-writing",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 6 ────────────────────────────────────────────────────────
  {
    id: "li-d06-two-column",
    title: "Two-Column Resumes Fail ATS 60% of the Time",
    subtitle: "The design looks great — the parser disagrees",
    category: "resume-writing",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d06-ats-checklist",
    title: "ATS-Friendly Resume Checklist",
    subtitle: "Ensure your resume gets through the filter",
    category: "resume-writing",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d06-parsed-ba",
    title: "Parsed Resume vs Original Resume",
    subtitle: "What ATS actually sees when it reads your file",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Beautiful design with icons", "Sidebar with contact info", "Custom fonts and colors"],
    afterPoints: ["Jumbled text in ATS view", "Contact info lost in parsing", "Fonts ignored, layout broken"],
  },

  // ─── Day 7 ────────────────────────────────────────────────────────
  {
    id: "li-d07-objective",
    title: "Objective Statements Waste Your Best Real Estate",
    subtitle: "Replace 'seeking a challenging role' with proof",
    category: "resume-writing",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d07-summary-ba",
    title: "Modern Summary vs Objective Statement",
    subtitle: "The evolution of the resume header",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Seeking a challenging role", "Results-oriented professional", "Objective: to grow my career"],
    afterPoints: ["Revenue marketer who grew pipeline 3x", "Shipped 12 features in 18 months", "Cut support tickets 40% via automation"],
  },
  {
    id: "li-d07-summary-grid",
    title: "4 Ways to Start Your Resume Summary",
    subtitle: "First impressions happen in the first line",
    category: "resume-writing",
    angle: "observation",
    layout: "grid-points",
  },

  // ─── Day 7b: Stats insert ────────────────────────────────────────
  {
    id: "li-d07-resume-stats",
    title: "Resume Statistics That Will Shock You",
    subtitle: "Data every job seeker needs to know",
    category: "resume-writing",
    angle: "observation",
    layout: "stat-highlight",
  },

  // ─── Day 8 ────────────────────────────────────────────────────────
  {
    id: "li-d08-100-jobs",
    title: "Applying to 100 Jobs Won't Help You",
    subtitle: "Targeted applications beat spray-and-pray",
    category: "job-search",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d08-quality-checklist",
    title: "Quality Application Checklist",
    subtitle: "7 steps before submitting any application",
    category: "job-search",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d08-spray-sidebar",
    title: "Spray-and-Pray vs Targeted Job Search",
    subtitle: "One wastes time — the other wastes none",
    category: "job-search",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 9 ────────────────────────────────────────────────────────
  {
    id: "li-d09-recruiter-ghost",
    title: "Why Recruiters Ghost After the First Call",
    subtitle: "It's rarely personal — here's what actually happens",
    category: "job-search",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d09-ghost-grid",
    title: "4 Reasons Recruiters Actually Ghost",
    subtitle: "Behind the scenes of the hiring pipeline",
    category: "job-search",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d09-recruiter-profile",
    title: "Recruiter-Ready LinkedIn Profile",
    subtitle: "What makes recruiters click InMail",
    category: "job-search",
    angle: "case-study",
    layout: "linkedin-profile",
  },

  // ─── Day 10 ───────────────────────────────────────────────────────
  {
    id: "li-d10-job-boards",
    title: "Job Boards Are Not Where Jobs Are Found",
    subtitle: "70-80% of roles fill through networking",
    category: "job-search",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d10-network-checklist",
    title: "Hidden Job Market Networking Checklist",
    subtitle: "How to access the 70% of jobs that aren't posted",
    category: "job-search",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d10-board-referral-ba",
    title: "Job Board Application vs Referral Application",
    subtitle: "Same job, wildly different odds",
    category: "job-search",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Applied via job board", "Generic resume submitted", "Never heard back"],
    afterPoints: ["Introduced by employee", "Resume hand-delivered", "Interview within a week"],
  },

  // ─── Day 11 ───────────────────────────────────────────────────────
  {
    id: "li-d11-headline",
    title: "Your LinkedIn Headline Is Costing You Interviews",
    subtitle: "Your job title alone is a wasted opportunity",
    category: "job-search",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d11-headline-grid",
    title: "4 LinkedIn Headline Formulas That Work",
    subtitle: "Templates that get recruiter attention",
    category: "job-search",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d11-headline-ba",
    title: "Generic Headline vs Value Headline",
    subtitle: "10 words that change your profile's reach",
    category: "job-search",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Marketing Manager at Acme", "Software Engineer", "Looking for opportunities"],
    afterPoints: ["Revenue marketer | Grew pipeline 3x at Acme", "Backend eng → 40% latency reduction at scale", "Sales leader helping SaaS teams hit quota"],
  },

  // ─── Day 12 ───────────────────────────────────────────────────────
  {
    id: "li-d12-job-title",
    title: "Does Your Job Title Even Matter?",
    subtitle: "Internal titles rarely match what recruiters search",
    category: "career-growth",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d12-title-checklist",
    title: "Job Title Negotiation Checklist",
    subtitle: "When and how to negotiate your title",
    category: "career-growth",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d12-title-sidebar",
    title: "Internal Title vs Market Title",
    subtitle: "Your company calls it one thing — the market calls it another",
    category: "career-growth",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 13 ───────────────────────────────────────────────────────
  {
    id: "li-d13-referrals",
    title: "Employee Referrals Aren't Nepotism",
    subtitle: "Referred candidates get hired 5x more often",
    category: "job-search",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d13-referral-checklist",
    title: "How to Ask for a Referral Without Being Awkward",
    subtitle: "A step-by-step approach that works",
    category: "job-search",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d13-cold-warm-ba",
    title: "Cold Apply vs Warm Introduction",
    subtitle: "The numbers don't lie",
    category: "job-search",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Applied cold on LinkedIn", "Resume in a pile of 300", "2% response rate"],
    afterPoints: ["Reached out to connection first", "Resume flagged by employee", "Got interview within days"],
  },

  // ─── Day 10b: Chart insert ───────────────────────────────────────
  {
    id: "li-d10-job-source-chart",
    title: "Where Job Offers Actually Come From",
    subtitle: "The channels that lead to real offers",
    category: "job-search",
    angle: "observation",
    layout: "chart",
  },

  // ─── Day 13b: Stats insert ───────────────────────────────────────
  {
    id: "li-d13-referral-stats",
    title: "The Referral Advantage in Numbers",
    subtitle: "Why your network is your best job search tool",
    category: "job-search",
    angle: "observation",
    layout: "stat-highlight",
  },

  // ─── Day 14 ───────────────────────────────────────────────────────
  {
    id: "li-d14-sunday",
    title: "Sunday Evening Applications Get Read First",
    subtitle: "When you apply matters more than you think",
    category: "job-search",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d14-timing-grid",
    title: "4 Best Times to Apply for Jobs",
    subtitle: "Data on when applications get the most attention",
    category: "job-search",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d14-timing-sidebar",
    title: "Strategic Application Timing",
    subtitle: "Early birds and off-peak applicants win",
    category: "job-search",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 15 ───────────────────────────────────────────────────────
  {
    id: "li-d15-tell-me",
    title: "Tell Me About Yourself Is Not About You",
    subtitle: "It's about what you can do for them",
    category: "interview-prep",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d15-intro-checklist",
    title: "Tell Me About Yourself Formula",
    subtitle: "A 3-part structure that always works",
    category: "interview-prep",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d15-ramble-ba",
    title: "Rambling Answer vs Structured Answer",
    subtitle: "The same experience, presented two ways",
    category: "interview-prep",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["5-minute life story", "No clear structure", "Interviewer lost interest"],
    afterPoints: ["90-second elevator pitch", "Present-past-future arc", "Interviewer leaned in"],
  },

  // ─── Day 16 ───────────────────────────────────────────────────────
  {
    id: "li-d16-behavioral",
    title: "Why Great Candidates Bomb Behavioral Questions",
    subtitle: "Talent without structure sounds like rambling",
    category: "interview-prep",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d16-star-grid",
    title: "4 STAR Method Pitfalls",
    subtitle: "Common mistakes that weaken your stories",
    category: "interview-prep",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d16-prep-profile",
    title: "Behavioral Interview Prep Profile",
    subtitle: "How a prepared candidate presents online",
    category: "interview-prep",
    angle: "case-study",
    layout: "linkedin-profile",
  },

  // ─── Day 17 ───────────────────────────────────────────────────────
  {
    id: "li-d17-salary",
    title: "Salary Negotiation Doesn't Start With a Number",
    subtitle: "It starts with leverage and timing",
    category: "career-growth",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d17-salary-checklist",
    title: "Salary Research Checklist",
    subtitle: "Know your number before the conversation",
    category: "career-growth",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d17-accept-negotiate",
    title: "Accepting First Offer vs Negotiating",
    subtitle: "The lifetime cost of not asking",
    category: "career-growth",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 18 ───────────────────────────────────────────────────────
  {
    id: "li-d18-thank-you",
    title: "The Thank-You Email Nobody Sends Correctly",
    subtitle: "Most thank-you notes are forgettable — here's why",
    category: "interview-prep",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d18-ty-checklist",
    title: "Thank-You Email That Stands Out",
    subtitle: "What to include beyond 'thanks for your time'",
    category: "interview-prep",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d18-ty-ba",
    title: "Generic Thank-You vs Specific Thank-You",
    subtitle: "One gets filed away — the other gets forwarded",
    category: "interview-prep",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Thanks for your time", "I enjoyed our conversation", "Looking forward to hearing back"],
    afterPoints: ["Loved your point about X initiative", "Here's the article I mentioned", "Attached a one-pager on my approach"],
  },

  // ─── Day 19 ───────────────────────────────────────────────────────
  {
    id: "li-d19-interviewer-notes",
    title: "What Do Interviewers Actually Write About You?",
    subtitle: "The scorecard reveals what really matters",
    category: "interview-prep",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d19-scorecard-grid",
    title: "4 Things on the Interviewer Scorecard",
    subtitle: "What gets documented after every interview",
    category: "interview-prep",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d19-prep-profile",
    title: "Candidate Who Prepared vs Candidate Who Winged It",
    subtitle: "Interviewers can always tell the difference",
    category: "interview-prep",
    angle: "case-study",
    layout: "linkedin-profile",
  },

  // ─── Day 20 ───────────────────────────────────────────────────────
  {
    id: "li-d20-skip-question",
    title: "You Don't Need to Answer Every Interview Question",
    subtitle: "Redirecting is a skill, not a dodge",
    category: "interview-prep",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d20-redirect-sidebar",
    title: "Interview Question Redirect Framework",
    subtitle: "How to steer tricky questions to your strengths",
    category: "interview-prep",
    angle: "observation",
    layout: "accent-sidebar",
  },
  {
    id: "li-d20-never-answer-grid",
    title: "4 Questions You Should Never Answer Directly",
    subtitle: "Legal minefields and how to handle them",
    category: "interview-prep",
    angle: "observation",
    layout: "grid-points",
  },

  // ─── Day 21 ───────────────────────────────────────────────────────
  {
    id: "li-d21-visibility",
    title: "Internal Promotions Go to Visible People, Not Best Performers",
    subtitle: "Doing great work quietly is a career risk",
    category: "career-growth",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d21-visibility-checklist",
    title: "Internal Visibility Checklist",
    subtitle: "How to make your work known without bragging",
    category: "career-growth",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d21-visible-ba",
    title: "Visible Contributor vs Quiet Performer",
    subtitle: "Same output — different career trajectories",
    category: "career-growth",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Does great work silently", "Never presents at all-hands", "Waits to be noticed"],
    afterPoints: ["Shares wins in team channels", "Volunteers for cross-team demos", "Builds relationships with skip-level"],
  },

  // ─── Day 22 ───────────────────────────────────────────────────────
  {
    id: "li-d22-loyalty",
    title: "Loyalty to One Company Hurts Your Salary",
    subtitle: "Tenure loyalty costs an average of 50% in lost earnings",
    category: "career-growth",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d22-hopper-ba",
    title: "Job Hopper Resume vs Loyal Resume",
    subtitle: "How to present short stints positively",
    category: "career-growth",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["3 jobs in 2 years looks flaky", "No clear progression", "Recruiters see a pattern"],
    afterPoints: ["Each move was a step up", "Clear skill-building narrative", "Promotions justify transitions"],
  },
  {
    id: "li-d22-leave-grid",
    title: "4 Signs It's Time to Change Companies",
    subtitle: "When staying becomes more expensive than leaving",
    category: "career-growth",
    angle: "observation",
    layout: "grid-points",
  },

  // ─── Day 23 ───────────────────────────────────────────────────────
  {
    id: "li-d23-title-bump",
    title: "Should You Take a Title Bump With No Raise?",
    subtitle: "Sometimes the title is the raise — sometimes it's a trap",
    category: "career-growth",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d23-title-sidebar",
    title: "Title vs Compensation Decision Framework",
    subtitle: "When each one matters more",
    category: "career-growth",
    angle: "observation",
    layout: "accent-sidebar",
  },
  {
    id: "li-d23-promo-checklist",
    title: "Promotion Readiness Checklist",
    subtitle: "Are you actually ready — or just impatient?",
    category: "career-growth",
    angle: "case-study",
    layout: "checklist",
  },

  // ─── Day 20b: Chart insert ───────────────────────────────────────
  {
    id: "li-d20-interview-callback-line",
    title: "Callback Rate Over Months of Targeted Job Search",
    subtitle: "Consistency compounds — most results come after month 3",
    category: "job-search",
    angle: "observation",
    layout: "chart",
  },

  // ─── Day 23b: Stats insert ───────────────────────────────────────
  {
    id: "li-d23-salary-stats",
    title: "Salary Negotiation by the Numbers",
    subtitle: "The data behind asking for more",
    category: "career-growth",
    angle: "observation",
    layout: "stat-highlight",
  },

  // ─── Day 24 ───────────────────────────────────────────────────────
  {
    id: "li-d24-raise-cost",
    title: "The Raise You Don't Ask For Costs $500K Over Your Career",
    subtitle: "Compound interest works on salary too",
    category: "career-growth",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d24-negotiate-grid",
    title: "4 Salary Negotiation Tactics That Work",
    subtitle: "Data-backed strategies, not guesswork",
    category: "career-growth",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d24-research-profile",
    title: "Pre-Negotiation Research Profile",
    subtitle: "What to know before naming a number",
    category: "career-growth",
    angle: "case-study",
    layout: "linkedin-profile",
  },

  // ─── Day 25 ───────────────────────────────────────────────────────
  {
    id: "li-d25-templates",
    title: "Resume Templates Do More Harm Than Good",
    subtitle: "Creative design backfires when ATS can't parse it",
    category: "resume-writing",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d25-template-ba",
    title: "Template Resume vs Custom Resume",
    subtitle: "Why generic templates hurt more than they help",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Downloaded a Canva template", "Looks great on screen", "ATS can't parse a single field"],
    afterPoints: ["Clean custom layout", "Readable by humans and machines", "Keywords in natural context"],
  },
  {
    id: "li-d25-design-checklist",
    title: "Resume Design Dos and Don'ts",
    subtitle: "Design choices that help vs hurt your chances",
    category: "resume-writing",
    angle: "observation",
    layout: "checklist",
  },

  // ─── Day 26 ───────────────────────────────────────────────────────
  {
    id: "li-d26-chatgpt-cl",
    title: "Can ChatGPT Write Your Cover Letter?",
    subtitle: "The telltale signs and how to avoid them",
    category: "cover-letter",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d26-ai-cl-ba",
    title: "AI-Written vs Human-Edited Cover Letter",
    subtitle: "The difference is obvious to hiring managers",
    category: "cover-letter",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Generic AI output", "Overuses 'leverage' and 'passionate'", "No company-specific details"],
    afterPoints: ["AI draft + human editing", "Natural voice and specifics", "References company's Q3 launch"],
  },
  {
    id: "li-d26-humanize-grid",
    title: "4 Ways to Humanize AI-Written Content",
    subtitle: "Use AI as a starting point, not the finished product",
    category: "cover-letter",
    angle: "observation",
    layout: "grid-points",
  },

  // ─── Day 27 ───────────────────────────────────────────────────────
  {
    id: "li-d27-action-verbs",
    title: "Resumes With Action Verbs Get 140% More Views",
    subtitle: "Led, built, shipped — the verbs that signal ownership",
    category: "resume-writing",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d27-verb-checklist",
    title: "Action Verb Power Checklist",
    subtitle: "Swap weak verbs for strong ones in every bullet",
    category: "resume-writing",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d27-passive-sidebar",
    title: "Passive Language vs Active Language on Resumes",
    subtitle: "Passive voice hides your contributions",
    category: "resume-writing",
    angle: "observation",
    layout: "accent-sidebar",
  },

  // ─── Day 28 ───────────────────────────────────────────────────────
  {
    id: "li-d28-mentor",
    title: "You Don't Need a Mentor to Grow Your Career",
    subtitle: "Mentors help — but waiting for one is a trap",
    category: "career-growth",
    angle: "contrarian",
    layout: "myth-reality",
  },
  {
    id: "li-d28-self-checklist",
    title: "Self-Directed Career Growth Checklist",
    subtitle: "Moves you can make without anyone's permission",
    category: "career-growth",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d28-no-mentor-grid",
    title: "4 Career Growth Moves That Don't Need a Mentor",
    subtitle: "Take your growth into your own hands",
    category: "career-growth",
    angle: "observation",
    layout: "grid-points",
  },

  // ─── Day 29 ───────────────────────────────────────────────────────
  {
    id: "li-d29-human-read",
    title: "Is Your Resume Actually Being Read by a Human?",
    subtitle: "75% of resumes never reach a person",
    category: "resume-writing",
    angle: "question",
    layout: "myth-reality",
  },
  {
    id: "li-d29-audit-checklist",
    title: "Resume Audit Checklist",
    subtitle: "A complete self-review before applying",
    category: "resume-writing",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "li-d29-ats-profile",
    title: "The ATS-Optimized LinkedIn Profile",
    subtitle: "Your LinkedIn profile feeds the same systems",
    category: "resume-writing",
    angle: "case-study",
    layout: "linkedin-profile",
  },

  // ─── Day 30 ───────────────────────────────────────────────────────
  {
    id: "li-d30-hidden-skill",
    title: "The Skill That Gets You Hired Isn't on Your Resume",
    subtitle: "Communication wins over credentials every time",
    category: "career-growth",
    angle: "observation",
    layout: "myth-reality",
  },
  {
    id: "li-d30-skills-grid",
    title: "4 Skills That Don't Belong on Your Resume",
    subtitle: "Remove these and add what matters",
    category: "resume-writing",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "li-d30-hard-soft-sidebar",
    title: "Technical Skills vs Communication Skills",
    subtitle: "The balance that hiring managers actually want",
    category: "career-growth",
    angle: "question",
    layout: "accent-sidebar",
  },

  // ═══════════════════════════════════════════════════════════════════
  // INSTAGRAM MORNING — 30 variety-layout topics (10 AM)
  // ═══════════════════════════════════════════════════════════════════

  // Week 1: Resume Foundations
  {
    id: "ig-d01-remove-checklist",
    title: "4 Things to Remove From Your Resume Today",
    subtitle: "Quick wins that make an immediate difference",
    category: "resume-writing",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "ig-d02-summary-ba",
    title: "Weak Summary vs Strong Summary",
    subtitle: "The difference between ignored and interviewed",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Generic objective statement", "Vague buzzwords", "No measurable outcomes"],
    afterPoints: ["Targeted value proposition", "Specific industry terms", "Quantified achievements"],
  },
  {
    id: "ig-d03-recruiter-reads",
    title: "4 Resume Sections Recruiters Read First",
    subtitle: "Where their eyes go in the first 7 seconds",
    category: "resume-writing",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "ig-d04-cl-opener",
    title: "Cover Letter Opener vs Closer",
    subtitle: "Both matter — but for different reasons",
    category: "cover-letter",
    angle: "observation",
    layout: "accent-sidebar",
  },
  {
    id: "ig-d05-recruiter-7sec",
    title: "What a Recruiter Sees in 7 Seconds",
    subtitle: "The scanning pattern that decides your fate",
    category: "job-search",
    angle: "observation",
    layout: "linkedin-profile",
  },
  {
    id: "ig-d06-cl-checklist",
    title: "Before You Send That Cover Letter",
    subtitle: "A quick pre-send sanity check",
    category: "cover-letter",
    angle: "question",
    layout: "checklist",
  },
  {
    id: "ig-d07-bullets-ba",
    title: "Generic Bullets vs Impact Bullets",
    subtitle: "Small rewrites that change everything",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Responsible for managing team", "Handled customer accounts", "Assisted with projects"],
    afterPoints: ["Led 8-person team to 130% quota", "Grew accounts by $2.4M ARR", "Shipped 3 features in 6 weeks"],
  },

  // Week 2: Job Search Tactics
  {
    id: "ig-d08-filled-signs",
    title: "4 Signs a Job Posting Is Already Filled",
    subtitle: "Red flags that save you time",
    category: "job-search",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "ig-d09-weekly-system",
    title: "Weekly Job Search System That Works",
    subtitle: "Structure beats motivation every time",
    category: "job-search",
    angle: "observation",
    layout: "checklist",
  },
  {
    id: "ig-d10-networking",
    title: "Networking Online vs In Person",
    subtitle: "Each has its strengths — use both",
    category: "career-growth",
    angle: "question",
    layout: "accent-sidebar",
  },
  {
    id: "ig-d11-cold-email-ba",
    title: "Job Search Cold Email: Before & After",
    subtitle: "The rewrite that gets replies",
    category: "job-search",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Generic greeting", "Long intro about yourself", "No clear ask"],
    afterPoints: ["Personalized opener", "Value-first pitch", "Specific, easy call-to-action"],
  },
  {
    id: "ig-d12-linkedin-inmail",
    title: "LinkedIn Profile That Gets Recruiter InMails",
    subtitle: "What makes a profile recruiter-magnetic",
    category: "job-search",
    angle: "case-study",
    layout: "linkedin-profile",
  },
  {
    id: "ig-d13-metrics",
    title: "4 Metrics That Prove Your Impact at Work",
    subtitle: "Numbers that hiring managers actually care about",
    category: "career-growth",
    angle: "question",
    layout: "grid-points",
  },
  {
    id: "ig-d14-interview-night",
    title: "Night-Before Interview Checklist",
    subtitle: "Prep that reduces interview-day stress",
    category: "interview-prep",
    angle: "observation",
    layout: "checklist",
  },

  // Week 3: Interview & Negotiation
  {
    id: "ig-d15-star-ba",
    title: "STAR Answer: Weak vs Strong",
    subtitle: "Structure turns rambling into compelling",
    category: "interview-prep",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Vague situation", "No specific action", "Missing result"],
    afterPoints: ["Concrete context", "Your exact contribution", "Quantified outcome"],
  },
  {
    id: "ig-d16-red-flags",
    title: "4 Interview Red Flags From the Employer",
    subtitle: "Warning signs that the job isn't what it seems",
    category: "interview-prep",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "ig-d17-negotiate-accept",
    title: "Accepting an Offer vs Negotiating",
    subtitle: "When to push back and when to say yes",
    category: "interview-prep",
    angle: "observation",
    layout: "accent-sidebar",
  },
  {
    id: "ig-d18-star-prep",
    title: "STAR Method Quick Prep",
    subtitle: "A 15-minute prep framework that works",
    category: "interview-prep",
    angle: "question",
    layout: "checklist",
  },
  {
    id: "ig-d19-perf-review-ba",
    title: "Performance Review: Weak vs Strong Self-Assessment",
    subtitle: "How you frame your year matters",
    category: "career-growth",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["I worked hard this year", "I helped with team projects", "I want to grow"],
    afterPoints: ["Delivered $400K pipeline via 3 initiatives", "Led cross-team project ahead of deadline", "Completed AWS cert, seeking tech lead path"],
  },
  {
    id: "ig-d20-promoted-profile",
    title: "The LinkedIn Profile That Gets Promoted",
    subtitle: "Internal visibility starts with your profile",
    category: "career-growth",
    angle: "observation",
    layout: "linkedin-profile",
  },
  {
    id: "ig-d21-impress-questions",
    title: "4 Questions That Impress Every Interviewer",
    subtitle: "Questions that show you've done your homework",
    category: "interview-prep",
    angle: "question",
    layout: "grid-points",
  },

  // Week 4: Advanced Career Moves
  {
    id: "ig-d22-quarterly-check",
    title: "Quarterly Career Check-In",
    subtitle: "A system for staying on track",
    category: "career-growth",
    angle: "case-study",
    layout: "checklist",
  },
  {
    id: "ig-d23-career-change-ba",
    title: "Career Changer Resume: Before & After",
    subtitle: "How to reframe experience for a new field",
    category: "resume-writing",
    angle: "case-study",
    layout: "before-after",
    beforePoints: ["Teaching experience only", "Education-specific skills", "No tech keywords"],
    afterPoints: ["Transferable skills highlighted", "UX research framing", "Portfolio link + metrics"],
  },
  {
    id: "ig-d24-functional-chrono",
    title: "Functional vs Chronological Resume",
    subtitle: "When each format works best",
    category: "resume-writing",
    angle: "contrarian",
    layout: "accent-sidebar",
  },
  {
    id: "ig-d25-senior-signs",
    title: "4 Signs You're Ready for a Senior Role",
    subtitle: "Readiness isn't just about years of experience",
    category: "career-growth",
    angle: "observation",
    layout: "grid-points",
  },
  {
    id: "ig-d26-linkedin-makeover",
    title: "From Ignored to Hired: LinkedIn Makeover",
    subtitle: "The profile changes that got recruiter attention",
    category: "job-search",
    angle: "case-study",
    layout: "linkedin-profile",
  },
  {
    id: "ig-d27-offer-checklist",
    title: "Before You Accept Any Job Offer",
    subtitle: "The checklist most candidates skip",
    category: "career-growth",
    angle: "question",
    layout: "checklist",
  },
  {
    id: "ig-d28-cl-targeted-ba",
    title: "Cover Letter: Generic vs Targeted",
    subtitle: "The difference is obvious to hiring managers",
    category: "cover-letter",
    angle: "observation",
    layout: "before-after",
    beforePoints: ["Dear Hiring Manager", "I'm excited to apply", "I have 5 years experience"],
    afterPoints: ["Dear [Specific Name]", "Your Q3 launch caught my attention", "I grew similar product 40% in 6 months"],
  },

  // Week 4b: Data viz inserts
  {
    id: "ig-d27b-skills-chart",
    title: "Top Skills Employers Search For in 2026",
    subtitle: "The skills that get you hired fastest",
    category: "career-growth",
    angle: "observation",
    layout: "chart",
  },
  {
    id: "ig-d28b-hiring-stats",
    title: "The Hiring Funnel in Numbers",
    subtitle: "What happens after you click apply",
    category: "job-search",
    angle: "observation",
    layout: "stat-highlight",
  },

  // Days 29-30: Recap & Engagement
  {
    id: "ig-d29-job-myths",
    title: "4 Job Search Myths That Waste Your Time",
    subtitle: "Stop believing these common misconceptions",
    category: "job-search",
    angle: "contrarian",
    layout: "grid-points",
  },
  {
    id: "ig-d30-hard-soft",
    title: "Hard Skills vs Soft Skills on Resumes",
    subtitle: "Why you need both — and how to show them",
    category: "resume-writing",
    angle: "question",
    layout: "accent-sidebar",
  },
];
