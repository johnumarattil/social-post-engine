import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";
import { MiniResume } from "./mini-resume";
import { getPersonaWithTitle } from "../../personas";

/** "Editorial Split" — diagonal split: left accent (top-aligned) + right dark gradient (bottom-aligned) */
export function render(props: LayoutProps, t: Theme): JSX.Element {
  const ld = props.layoutData as { title1?: string; sub1?: string; title2?: string; sub2?: string; resumeJobTitle?: string } | undefined;
  const title1 = ld?.title1 ?? props.title;
  const sub1 = ld?.sub1;
  const title2 = ld?.title2 ?? props.subtitle ?? "";
  const sub2 = ld?.sub2;
  const persona = getPersonaWithTitle(props.title, ld?.resumeJobTitle);

  const bgGradient = `linear-gradient(145deg, ${t.textPrimary} 0%, #021a16 60%, #031f18 100%)`;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Full accent background */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: t.accent,
        }}
      />

      {/* Mini resume — rendered before overlay so it gets clipped by it */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "120px",
          left: "500px",
          width: "420px",
        }}
      >
        <MiniResume name={persona.name} title={persona.title} avatarDataUri={persona.avatarDataUri} variant="light" />
      </div>

      {/* Diagonal dark gradient overlay (right side) */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-20%",
          left: "40%",
          width: "200%",
          height: "140%",
          backgroundImage: bgGradient,
          transform: "skewX(-60deg)",
          boxShadow: "-12px 0 30px rgba(0,0,0,0.15)",
        }}
      />

      {/* Subtle circle decoration on accent side */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "-60px",
          left: "100px",
          width: "280px",
          height: "280px",
          borderRadius: "140px",
          backgroundColor: "rgba(255,255,255,0.06)",
        }}
      />

      {/* Left content — top-aligned */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "72px",
          left: "40px",
          width: "40%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Sora ExtraBold",
            fontSize: "48px",
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          {title1}
        </div>
        {sub1 && (
          <div
            style={{
              display: "flex",
              fontFamily: "Sora",
              fontSize: "30px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
              marginTop: "20px",
            }}
          >
            {sub1}
          </div>
        )}
        {props.date && (
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "16px",
            }}
          >
            {props.date}
          </div>
        )}

      </div>

      {/* Right content — bottom-aligned */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: "72px",
          right: "40px",
          width: "42%",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "24px",
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
        {/* Accent divider */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "2px",
            backgroundImage: `linear-gradient(90deg, ${t.accent} 0%, ${t.accent}50 60%, transparent 100%)`,
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Sora ExtraBold",
            fontSize: "48px",
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          {title2}
        </div>
        {sub2 && (
          <div
            style={{
              display: "flex",
              fontFamily: "Lora Italic",
              fontSize: "30px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
              marginTop: "12px",
            }}
          >
            {sub2}
          </div>
        )}
      </div>
    </div>
  );
}
