import { Builder, JSX, type Font } from "canvacord";
import { getTheme, type Theme } from "../themes";
import type { ThemeName } from "../types";
import { getLogo, getBrandName, getBrandWebsite } from "../brand";

export interface TwitterPostProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
}

export class TwitterPost extends Builder<TwitterPostProps> {
  constructor() {
    super(1200, 675);
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
          padding: "50px 60px",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle — bottom-left */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "320px",
            height: "320px",
            borderRadius: "160px",
            backgroundColor: t.accent,
            opacity: 0.08,
          }}
        />

        {/* Header — logo + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={getLogo()}
            width={28}
            height={28}
            style={{ display: "flex" }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora SemiBold",
              fontSize: "18px",
              color: "#000000",
            }}
          >
            { getBrandName() }
          </div>
        </div>

        {/* Content — accent bar + title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "100px",
              height: "5px",
              backgroundColor: t.accent,
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora ExtraBold",
              fontSize: "50px",
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
                fontSize: "24px",
                color: t.textSecondary,
                lineHeight: 1.4,
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
