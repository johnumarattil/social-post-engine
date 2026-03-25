import { Builder, JSX, type Font } from "canvacord";
import { getTheme, type Theme } from "../themes";
import type { ThemeName } from "../types";
import { getLogo, getBrandName, getBrandWebsite } from "../brand";

export interface InstagramPostProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
}

export class InstagramPost extends Builder<InstagramPostProps> {
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
          padding: "80px",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle — top-right */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "380px",
            height: "380px",
            borderRadius: "190px",
            backgroundColor: t.accent,
            opacity: 0.08,
          }}
        />

        {/* Decorative circle — bottom-left */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "340px",
            height: "340px",
            borderRadius: "170px",
            backgroundColor: t.accent,
            opacity: 0.06,
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

        {/* Content — centered accent bar + title + subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80px",
              height: "5px",
              backgroundColor: t.accent,
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora ExtraBold",
              fontSize: "54px",
              color: t.textPrimary,
              lineHeight: 1.15,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                fontFamily: "Lora Italic",
                fontSize: "26px",
                color: t.textSecondary,
                lineHeight: 1.5,
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer — author | date centered, brand website below */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {author && (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora",
                  fontSize: "16px",
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
                  fontSize: "14px",
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
              opacity: 0.7,
            }}
          >
            { getBrandWebsite() }
          </div>
        </div>
      </div>
    );
  }
}
