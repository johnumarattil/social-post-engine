import { Builder, JSX, type Font } from "canvacord";
import { getTheme, type Theme } from "../themes";
import type { ThemeName } from "../types";
import { getLogo, getBrandName, getBrandWebsite } from "../brand";

export interface InstagramStoryProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
}

export class InstagramStory extends Builder<InstagramStoryProps> {
  constructor() {
    super(1080, 1920);
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
          padding: "100px 60px",
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
            top: "-140px",
            right: "-140px",
            width: "450px",
            height: "450px",
            borderRadius: "225px",
            backgroundColor: t.accent,
            opacity: 0.08,
          }}
        />

        {/* Decorative circle — bottom-left */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "-160px",
            left: "-160px",
            width: "400px",
            height: "400px",
            borderRadius: "200px",
            backgroundColor: t.accent,
            opacity: 0.06,
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "4px",
            backgroundColor: t.accent,
            opacity: 0.6,
            borderRadius: "2px",
          }}
        />

        {/* Header — logo + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={getLogo()}
            width={36}
            height={36}
            style={{ display: "flex" }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora SemiBold",
              fontSize: "22px",
              color: "#000000",
            }}
          >
            { getBrandName() }
          </div>
        </div>

        {/* Content — centered title + subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100px",
              height: "6px",
              backgroundColor: t.accent,
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Sora ExtraBold",
              fontSize: "62px",
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
                fontSize: "30px",
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

        {/* Footer — author pill badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {(author || date) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "14px 28px",
                backgroundColor: t.accent,
                borderRadius: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora SemiBold",
                  fontSize: "18px",
                  color: t.accentText,
                }}
              >
                {author ?? ""}
              </div>
              {author && date && (
                <div
                  style={{
                    display: "flex",
                    width: "1px",
                    height: "16px",
                    backgroundColor: t.accentText,
                    opacity: 0.4,
                  }}
                />
              )}
              {date && (
                <div
                  style={{
                    display: "flex",
                    fontFamily: "IBM Plex Mono",
                    fontSize: "16px",
                    color: t.accentText,
                    opacity: 0.85,
                  }}
                >
                  {date}
                </div>
              )}
            </div>
          )}
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

        {/* Bottom accent line */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "4px",
            backgroundColor: t.accent,
            opacity: 0.6,
            borderRadius: "2px",
          }}
        />
      </div>
    );
  }
}
