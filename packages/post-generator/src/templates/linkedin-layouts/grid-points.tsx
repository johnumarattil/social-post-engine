import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";

/** "Grid Points" — 2x2 numbered grid for multi-factor topics */
const DEFAULT_POINTS = [
  { label: "Keywords", description: "Match job description terms in your resume" },
  { label: "Metrics", description: "Quantify results with numbers and percentages" },
  { label: "Format", description: "Use clean single-column ATS-friendly layout" },
  { label: "Summary", description: "Lead with a targeted professional summary" },
];

export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;

  const points: { label: string; description: string }[] =
    (layoutData?.points as { label: string; description: string }[] | undefined) ?? DEFAULT_POINTS;

  const bgGradient = `linear-gradient(145deg, ${t.textPrimary} 0%, #021a16 60%, #031f18 100%)`;
  const dividerColor = `${t.accent}50`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundImage: bgGradient,
        padding: "48px 56px",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative ring — top right */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "180px",
          border: `1px solid ${t.accent}15`,
        }}
      />
      {/* Second ring — bottom left */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "140px",
          border: `1px solid rgba(255,255,255,0.03)`,
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={getLogo()} width={32} height={32} style={{ display: "flex" }} />
        <div
          style={{
            display: "flex",
            fontFamily: "Sora SemiBold",
            fontSize: "20px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          { getBrandName() }
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Title */}
        <div
          style={{
            display: "flex",
            fontFamily: "Sora ExtraBold",
            fontSize: "48px",
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              display: "flex",
              fontFamily: "Lora Italic",
              fontSize: "30px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Accent divider */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "2px",
            backgroundImage: `linear-gradient(90deg, ${t.accent} 0%, ${dividerColor} 60%, transparent 100%)`,
            marginTop: "4px",
            marginBottom: "16px",
          }}
        />

        {/* 2x2 Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {points.map((point, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "24px",
                gap: "12px",
              }}
            >
              {/* Number */}
              <div
                style={{
                  display: "flex",
                  fontFamily: "IBM Plex Mono",
                  fontSize: "28px",
                  color: t.accent,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* Label */}
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora SemiBold",
                  fontSize: "32px",
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {point.label}
              </div>
              {/* Description */}
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora",
                  fontSize: "24px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.4,
                }}
              >
                {point.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {author && (
            <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>
              {author}
            </div>
          )}
          {author && date && (
            <div style={{ display: "flex", fontFamily: "Sora", fontSize: "16px", color: "rgba(255,255,255,0.3)" }}>·</div>
          )}
          {date && (
            <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "16px", color: "rgba(255,255,255,0.3)" }}>
              {date}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "22px", color: "rgba(255,255,255,0.3)" }}>
          { getBrandWebsite() }
        </div>
      </div>
    </div>
  );
}
