import { Builder, type JSX } from "canvacord";
import { getTheme, type Theme } from "../../themes";
import type { PostLayout, ThemeName } from "../../types";

import { render as linkedinProfile } from "./linkedin-profile";
import { render as beforeAfter } from "./before-after";
import { render as checklist } from "./checklist";
import { render as mythReality } from "./myth-reality";
import { render as accentSidebar } from "./accent-sidebar";
import { render as gridPoints } from "./grid-points";
import { render as statHighlight } from "./stat-highlight";
import { render as chart } from "./chart";
import { render as miniResume } from "./mini-resume-layout";
import { render as miniCoverLetter } from "./mini-cover-letter-layout";


export interface LayoutProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  beforePoints?: string[];
  afterPoints?: string[];
  layoutData?: Record<string, unknown>;
}

export type LayoutRenderer = (props: LayoutProps, theme: Theme) => JSX.Element;

export const layoutRenderers: Record<string, LayoutRenderer> = {
  "linkedin-profile": linkedinProfile,
  "before-after": beforeAfter,
  "checklist": checklist,
  "myth-reality": mythReality,
  "accent-sidebar": accentSidebar,
  "grid-points": gridPoints,
  "stat-highlight": statHighlight,
  "chart": chart,
  "mini-resume": miniResume,
  "mini-cover-letter": miniCoverLetter,
};

export interface LinkedInLayoutPostProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
  beforePoints?: string[];
  afterPoints?: string[];
  layoutData?: string;
}

export class LinkedInLayoutPost extends Builder<LinkedInLayoutPostProps> {
  private layout: PostLayout;

  constructor(layout: PostLayout) {
    super(1080, 1080);
    this.layout = layout;
  }

  async render() {
    const { title, subtitle, author, date, theme: themeName, accentColor, beforePoints, afterPoints, layoutData: layoutDataJson } =
      this.options.getOptions();
    const t = getTheme(themeName ?? "light", accentColor);

    const renderer = layoutRenderers[this.layout];
    if (!renderer) {
      throw new Error(`Unknown layout: ${this.layout}`);
    }

    let layoutData: Record<string, unknown> | undefined;
    if (layoutDataJson) {
      try {
        layoutData = JSON.parse(layoutDataJson);
      } catch {
        // Invalid JSON — fall back to no layout data
      }
    }

    return renderer({ title, subtitle, author, date, beforePoints, afterPoints, layoutData }, t);
  }
}
