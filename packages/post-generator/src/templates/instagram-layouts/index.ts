import { Builder, type JSX } from "canvacord";
import { getTheme } from "../../themes";
import type { PostLayout, ThemeName } from "../../types";
import { layoutRenderers } from "../linkedin-layouts/index";

export interface InstagramLayoutPostProps {
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

export class InstagramLayoutPost extends Builder<InstagramLayoutPostProps> {
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
