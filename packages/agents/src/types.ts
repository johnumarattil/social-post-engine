export type PostSource = "trending" | "preset";
export type PostStatus = "pending" | "published" | "failed";
export type Platform =
  | "linkedin"
  | "twitter"
  | "instagram"
  | "instagram-story";
export type ThemeName = "light";

export interface PlatformEntry {
  imagePath: string;
  status: PostStatus;
  publishedAt: string | null;
}

export interface PendingPost {
  id: string;
  source: PostSource;
  presetId?: string;
  title: string;
  subtitle?: string;
  caption: string;
  author: string;
  date: string;
  theme: ThemeName;
  layout?: string;
  layoutData?: Record<string, unknown>;
  platforms: Partial<Record<Platform, PlatformEntry>>;
  createdAt: string;
}

export interface PostStore {
  posts: PendingPost[];
}
