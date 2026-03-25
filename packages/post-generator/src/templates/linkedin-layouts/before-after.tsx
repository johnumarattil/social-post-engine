import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";
import { MiniResume } from "./mini-resume";
import { getPersonaWithTitle } from "../../personas";

/** "Horizontal Split Before/After" — title top, before-left / after-right bottom */
export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;
  const beforePoints = (layoutData?.beforePoints as string[] | undefined) ?? props.beforePoints;
  const afterPoints = (layoutData?.afterPoints as string[] | undefined) ?? props.afterPoints;
  const resumeJobTitle = layoutData?.resumeJobTitle as string | undefined;
  const persona = getPersonaWithTitle(title, resumeJobTitle);
  const hasBefore = beforePoints && beforePoints.length > 0;
  const hasAfter = afterPoints && afterPoints.length > 0;

  const pointCount = Math.max(beforePoints?.length ?? 0, afterPoints?.length ?? 0);
  const isCompact = pointCount > 5;
  const pointSize = isCompact ? "24px" : "32px";
  const pointGap = isCompact ? "12px" : "20px";
  const titleSize = isCompact ? "40px" : "48px";
  const iconSize = isCompact ? 28 : 34;

  const bgGradient = `linear-gradient(145deg, ${t.textPrimary} 0%, #021a16 60%, #031f18 100%)`;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        flexDirection: "column",
      }}
    >
      {/* Dark gradient background */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundImage: bgGradient,
        }}
      />

      {/* Decorative accent strip at very top */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "6px",
          backgroundImage: "linear-gradient(90deg, #4A4458 0%, #4A4458 50%, #0D9488 50%, #0D9488 100%)",
        }}
      />

      {/* Decorative ring top-right */}
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

      {/* ── Top section: branding + title ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "52px 56px 0 56px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
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

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontFamily: "Sora ExtraBold",
            fontSize: titleSize,
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
              fontSize: isCompact ? "26px" : "30px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
              marginTop: "8px",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* ── Bottom section: Before (left) / After (right) ── */}
      <div
        style={{
          display: "flex",
          flex: 1,
          position: "relative",
          padding: "28px 0 0 0",
          gap: "0px",
        }}
      >
        {/* Before column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "relative",
            backgroundColor: "#4A4458",
            padding: "32px 32px 32px 56px",
          }}
        >
          {/* Inner shadow on right edge */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "0",
              right: "0",
              width: "30px",
              height: "100%",
              backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* BEFORE label */}
          <div
            style={{
              display: "flex",
              fontFamily: "Sora ExtraBold",
              fontSize: "20px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            Before
          </div>

          {hasBefore ? (
            <div style={{ display: "flex", flexDirection: "column", gap: pointGap }}>
              {beforePoints.map((point, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2L12 12M12 2L2 12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Sora SemiBold",
                      fontSize: pointSize,
                      color: "#ffffff",
                      lineHeight: 1.3,
                    }}
                  >
                    {point}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", width: "200px", height: "12px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "6px" }} />
              <div style={{ display: "flex", width: "180px", height: "12px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "6px" }} />
              <div style={{ display: "flex", width: "160px", height: "12px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "6px" }} />
            </div>
          )}

        </div>

        {/* After column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: "#0D9488",
            padding: "32px 56px 32px 32px",
          }}
        >
          {/* AFTER label */}
          <div
            style={{
              display: "flex",
              fontFamily: "Sora ExtraBold",
              fontSize: "20px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            After
          </div>

          {hasAfter ? (
            <div style={{ display: "flex", flexDirection: "column", gap: pointGap }}>
              {afterPoints.map((point, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7.5L5.5 11L12 3" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Sora SemiBold",
                      fontSize: pointSize,
                      color: "#ffffff",
                      lineHeight: 1.3,
                    }}
                  >
                    {point}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", width: "200px", height: "12px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "6px" }} />
              <div style={{ display: "flex", width: "180px", height: "12px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "6px" }} />
              <div style={{ display: "flex", width: "160px", height: "12px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "6px" }} />
            </div>
          )}
        </div>

        {/* Footer — absolute positioned at bottom, over panels */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            padding: "12px 56px",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)",
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

      {/* Mini resume — bottom center, scaled up, top half bleeding into frame */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "-220px",
          left: "330px",
          width: "420px",
          transform: "scale(1.4)",
        }}
      >
        <MiniResume name={persona.name} title={persona.title} avatarDataUri={persona.avatarDataUri} variant="light" />
      </div>
    </div>
  );
}
