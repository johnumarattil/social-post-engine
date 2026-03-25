export type Platform = "linkedin" | "twitter" | "instagram" | "instagram-story";
export type ThemeName = "light";
export type ImageFormat = "png" | "jpeg" | "webp";

export type PostLayout =
  | "default"
  | "linkedin-profile"
  | "before-after"
  | "checklist"
  | "myth-reality"
  | "accent-sidebar"
  | "grid-points"
  | "stat-highlight"
  | "chart";

export interface GenerateOptions {
  platform: Platform;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
  format?: ImageFormat;
  layout?: PostLayout;
  beforePoints?: string[];
  afterPoints?: string[];
  layoutData?: string;
}

export interface GenerateResult {
  buffer: Buffer;
  format: ImageFormat;
  width: number;
  height: number;
  mimeType: string;
}
