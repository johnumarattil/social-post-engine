import * as fs from "fs";
import * as path from "path";
import { generatePostImage } from "./index";
import type { PostLayout, ThemeName } from "./types";

interface PostSpec {
  layout: PostLayout;
  title: string;
  subtitle?: string;
  theme: ThemeName;
  layoutData?: string;
}

const AUTHOR = "wahresume";
const DATE = "Mar 2026";

const posts: PostSpec[] = [
  {
    layout: "linkedin-profile",
    title: "Your LinkedIn Photo Matters More Than Your Headline",
    subtitle: "Profiles with professional photos get 14x more views",
    theme: "light",
    layoutData: JSON.stringify({
      profileName: "Sarah Chen",
      headline: "Product Manager | SaaS Growth | Ex-Google",
      location: "New York, NY",
      aboutSnippet: "Building products that scale. 6 years leading cross-functional teams from 0→1 at top tech companies.",
    }),
  },
  {
    layout: "before-after",
    title: "Past Tense vs. Present Tense on Your Resume",
    subtitle: "The rule is simpler than you think",
    theme: "light",
    layoutData: JSON.stringify({
      beforePoints: ["Used present tense for past jobs", "Mixed tenses randomly", "Inconsistent formatting"],
      afterPoints: ["Past tense for previous roles", "Present tense for current role", "Consistent throughout"],
    }),
  },
  {
    layout: "checklist",
    title: "The Best Time to Follow Up After an Interview",
    subtitle: "48 hours is the sweet spot — here's why",
    theme: "light",
    layoutData: JSON.stringify({
      items: [
        { text: "Send thank-you email within 24 hours", checked: true },
        { text: "Reference specific conversation points", checked: true },
        { text: "Follow up again after one week", checked: false },
        { text: "Connect with interviewer on LinkedIn", checked: false },
      ],
    }),
  },
  {
    layout: "myth-reality",
    title: "Follow Your Passion Is Terrible Career Advice",
    subtitle: "Skills-first beats passion-first in real career data",
    theme: "light",
    layoutData: JSON.stringify({
      myth: "Follow your passion and the money will follow",
      reality: "Build rare skills first — passion grows from mastery",
    }),
  },
  {
    layout: "accent-sidebar",
    title: "Career Gaps Hurt Less Than You Think",
    subtitle: "How you frame the gap matters more than the gap itself",
    theme: "light",
    layoutData: JSON.stringify({
      title1: "Career Gaps Hurt Less Than You Think",
      sub1: "76% of hiring managers say gaps under 2 years aren't a dealbreaker",
      title2: "Frame It Right",
      sub2: "How you explain the gap matters more than the gap itself",
    }),
  },
  {
    layout: "grid-points",
    title: "4 Things Recruiters Check Before Reading Your Resume",
    subtitle: "First impressions happen in seconds",
    theme: "light",
    layoutData: JSON.stringify({
      points: [
        { label: "Job Title Match", description: "Does your current title align with the open role?" },
        { label: "Company Tier", description: "Have you worked at recognized or relevant companies?" },
        { label: "Tenure Length", description: "Do you show stability or frequent job-hopping?" },
        { label: "Location Fit", description: "Are you local, remote-ready, or willing to relocate?" },
      ],
    }),
  },
  {
    layout: "stat-highlight",
    title: "Resume Statistics That Will Shock You",
    subtitle: "Data every job seeker needs to know",
    theme: "light",
    layoutData: JSON.stringify({
      stats: [
        { value: "75%", label: "Rejected by ATS", description: "before a human sees them" },
        { value: "8s", label: "Average Review", description: "time per resume by recruiters" },
        { value: "3x", label: "More Interviews", description: "with a tailored resume" },
      ],
      source: "Jobscan, 2025",
    }),
  },
  {
    layout: "chart",
    title: "Resume Sections That Get the Most Recruiter Attention",
    subtitle: "Where recruiters spend their 8 seconds",
    theme: "light",
    layoutData: JSON.stringify({
      chartType: "bar",
      items: [
        { label: "Professional Summary", value: 85, highlight: true },
        { label: "Work Experience", value: 72 },
        { label: "Skills Section", value: 58 },
        { label: "Education", value: 41 },
        { label: "Certifications", value: 28 },
      ],
      source: "TheLadders Eye-Tracking Study",
    }),
  },
];

async function main() {
  const outDir = path.resolve(__dirname, "../../..", "output/verify");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const post of posts) {
    const result = await generatePostImage({
      platform: "linkedin",
      title: post.title,
      subtitle: post.subtitle,
      author: AUTHOR,
      date: DATE,
      theme: post.theme,
      layout: post.layout,
      layoutData: post.layoutData,
    });

    const filename = `${post.layout}.png`;
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, result.buffer);
    console.log(`  ${filename}`);
  }

  console.log(`\nAll ${posts.length} images saved to ${outDir}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
