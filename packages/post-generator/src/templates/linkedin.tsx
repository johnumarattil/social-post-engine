import { Builder, JSX, type Font } from "canvacord";
import { getTheme, type Theme } from "../themes";
import type { ThemeName } from "../types";
import { getLogo, getBrandName, getBrandWebsite } from "../brand";

export interface LinkedInPostProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
}

export class LinkedInPost extends Builder<LinkedInPostProps> {
  constructor() {
    super(1080, 1080);
  }

  async render() {
    const { title, subtitle, author, date, theme: themeName, accentColor } =
      this.options.getOptions();
    const t = getTheme(themeName ?? "light", accentColor);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundImage: t.background,
          padding: "48px 60px",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle — top-right */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "150px",
            backgroundColor: t.accent,
            opacity: 0.08,
          }}
        />

        {/* Header — logo + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={getLogo()}
            width={32}
            height={32}
            style={{ display: "flex" }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora SemiBold",
              fontSize: "20px",
              color: "#000000",
            }}
          >
            { getBrandName() }
          </div>
        </div>

        {/* Content — accent bar + title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Accent bar */}
          <div
            style={{
              display: "flex",
              width: "120px",
              height: "6px",
              backgroundColor: t.accent,
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora ExtraBold",
              fontSize: "52px",
              color: t.textPrimary,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                fontFamily: "Lora Italic",
                fontSize: "22px",
                color: t.textSecondary,
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer — author | date ... brand website */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {author && (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora",
                  fontSize: "18px",
                  color: t.textPrimary,
                  fontWeight: 600,
                }}
              >
                {author}
              </div>
            )}
            {author && date && (
              <div
                style={{
                  display: "flex",
                  width: "1px",
                  height: "16px",
                  backgroundColor: t.textSecondary,
                  opacity: 0.5,
                }}
              />
            )}
            {date && (
              <div
                style={{
                  display: "flex",
                  fontFamily: "IBM Plex Mono",
                  fontSize: "16px",
                  color: t.textSecondary,
                }}
              >
                {date}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: "16px",
              color: t.textSecondary,
            }}
          >
            { getBrandWebsite() }
          </div>
        </div>
      </div>
    );
  }
}
