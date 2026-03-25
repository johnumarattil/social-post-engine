import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";

/** "Stat Highlight" — 3 oversized statistics in a bold data-driven infographic */
const DEFAULT_STATS = [
  { value: "75%", label: "Rejected by ATS", description: "before a human sees them" },
  { value: "8s", label: "Average Review", description: "time per resume by recruiters" },
  { value: "3x", label: "More Interviews", description: "with a tailored resume" },
];

export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;

  const stats: { value: string; label: string; description?: string }[] =
    (layoutData?.stats as { value: string; label: string; description?: string }[] | undefined) ?? DEFAULT_STATS;

  const source = (layoutData?.source as string | undefined) ?? "";

  // Dark palette for maximum contrast on the numbers
  const bgGradient = `linear-gradient(145deg, ${t.textPrimary} 0%, #021a16 60%, #031f18 100%)`;
  const valueColor = t.accent;
  const labelColor = "#ffffff";
  const descColor = "rgba(255,255,255,0.45)";
  const dividerColor = `${t.accent}50`;
  const cardBg = "rgba(255,255,255,0.04)";
  const cardBorder = "rgba(255,255,255,0.08)";

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
      {/* Subtle decorative ring — top right */}
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

      {/* Title section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Sora ExtraBold",
            fontSize: "52px",
            color: "#ffffff",
            lineHeight: 1.1,
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
            marginTop: "8px",
          }}
        />
      </div>

      {/* Stat cards — 3 across */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        {stats.slice(0, 3).map((stat, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "16px",
              padding: "36px 28px",
              gap: "8px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent stripe */}
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "3px",
                backgroundColor: t.accent,
                opacity: 0.6 + i * 0.15,
              }}
            />
            {/* Big number */}
            <div
              style={{
                display: "flex",
                fontFamily: "IBM Plex Mono",
                fontSize: "84px",
                color: valueColor,
                lineHeight: 1,
                letterSpacing: "-3px",
              }}
            >
              {stat.value}
            </div>
            {/* Label */}
            <div
              style={{
                display: "flex",
                fontFamily: "Sora SemiBold",
                fontSize: "26px",
                color: labelColor,
                lineHeight: 1.2,
                marginTop: "4px",
              }}
            >
              {stat.label}
            </div>
            {/* Description */}
            {stat.description && (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora",
                  fontSize: "20px",
                  color: descColor,
                  lineHeight: 1.4,
                }}
              >
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Source attribution + Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {source && (
            <div
              style={{
                display: "flex",
                fontFamily: "IBM Plex Mono",
                fontSize: "14px",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Source: {source}
            </div>
          )}
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
        </div>
        <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "22px", color: "rgba(255,255,255,0.3)" }}>
          { getBrandWebsite() }
        </div>
      </div>
    </div>
  );
}
