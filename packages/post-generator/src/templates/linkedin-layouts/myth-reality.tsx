import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";
import { MYTH_GIRLS_URI, REALITY_GIRL_URI } from "./myth-reality-images";

/** "Myth vs Reality" — before-after style split with title top, myth-left / reality-right bottom */
export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, author, date, layoutData } = props;
  const displayTitle = (layoutData?.title as string | undefined) ?? title;
  const myths: string[] = (layoutData?.myths as string[] | undefined) ??
    (layoutData?.myth ? [layoutData.myth as string] : [title]);
  const realities: string[] = (layoutData?.realities as string[] | undefined) ??
    (layoutData?.reality ? [layoutData.reality as string] : [title]);

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
          padding: "52px 56px 32px 56px",
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
            fontSize: "48px",
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          {displayTitle}
        </div>
      </div>

      {/* ── Bottom section: Myth (left) / Reality (right) ── */}
      <div
        style={{
          display: "flex",
          flex: 1,
          position: "relative",
          padding: "28px 0 0 0",
        }}
      >
        {/* Myth column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "relative",
            backgroundColor: "#4A4458",
            padding: "32px 32px 48px 56px",
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

          {/* MYTH label with bg bleeding to left */}
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: "24px",
              marginLeft: "-56px",
              paddingLeft: "56px",
              paddingRight: "20px",
              paddingTop: "8px",
              paddingBottom: "8px",
              backgroundColor: "rgba(0,0,0,0.25)",
              fontFamily: "Sora ExtraBold",
              fontSize: "20px",
              color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
            }}
          >
            Myth
          </div>

          {/* Myth items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {myths.map((m, i) => (
              <div
                key={`myth-${i}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "28px",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "2px",
                  }}
                >
                  •
                </div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Sora SemiBold",
                    fontSize: "28px",
                    color: "#ffffff",
                    lineHeight: 1.3,
                    opacity: 0.85,
                  }}
                >
                  {m}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Reality column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "relative",
            backgroundColor: "#0D9488",
            padding: "32px 56px 48px 32px",
          }}
        >
          {/* REALITY label with bg bleeding to left */}
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: "24px",
              marginLeft: "-32px",
              paddingLeft: "32px",
              paddingRight: "20px",
              paddingTop: "8px",
              paddingBottom: "8px",
              backgroundColor: "rgba(0,0,0,0.2)",
              fontFamily: "Sora ExtraBold",
              fontSize: "20px",
              color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
            }}
          >
            Reality
          </div>

          {/* Reality items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {realities.map((r, i) => (
              <div
                key={`reality-${i}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "28px",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "2px",
                  }}
                >
                  •
                </div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Sora ExtraBold",
                    fontSize: "28px",
                    color: "#ffffff",
                    lineHeight: 1.3,
                  }}
                >
                  {r}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confused girl overlay — bottom-center of myth, bleeding off bottom */}
        <img
          src={MYTH_GIRLS_URI}
          width={340}
          height={310}
          style={{
            display: "flex",
            position: "absolute",
            bottom: "-30px",
            left: "100px",
            objectFit: "cover",
            borderRadius: "24px 24px 0 0",
            borderTop: "3px solid rgba(212, 175, 55, 0.5)",
            borderLeft: "3px solid rgba(212, 175, 55, 0.5)",
            borderRight: "3px solid rgba(212, 175, 55, 0.5)",
          }}
        />

        {/* "That's right" girl overlay — bottom-center of reality, bleeding off bottom */}
        <img
          src={REALITY_GIRL_URI}
          width={340}
          height={310}
          style={{
            display: "flex",
            position: "absolute",
            bottom: "-30px",
            left: "640px",
            objectFit: "cover",
            borderRadius: "24px 24px 0 0",
            borderTop: "3px solid rgba(212, 175, 55, 0.5)",
            borderLeft: "3px solid rgba(212, 175, 55, 0.5)",
            borderRight: "3px solid rgba(212, 175, 55, 0.5)",
          }}
        />

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
    </div>
  );
}
