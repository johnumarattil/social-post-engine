import { JSX } from "canvacord";

export interface MiniCoverLetterProps {
  name?: string;
  recipientRole?: string;
  /** "light" = dark text on white card, "on-accent" = white text on translucent card */
  variant?: "light" | "on-accent";
}

export function MiniCoverLetter(props: MiniCoverLetterProps): JSX.Element {
  const name = props.name ?? "Jane Doe";
  const recipientRole = props.recipientRole ?? "Hiring Manager";
  const variant = props.variant ?? "light";

  const isLight = variant === "light";
  const cardBg = isLight ? "#ffffff" : "rgba(255,255,255,0.15)";
  const cardBorder = isLight ? "1.5px solid #d1d5db" : "none";
  const cardShadow = isLight ? "4px 8px 24px rgba(0,0,0,0.12)" : "none";
  const headingColor = isLight ? "#475569" : "rgba(255,255,255,0.7)";
  const nameColor = isLight ? "#1e293b" : "#ffffff";
  const bodyColor = isLight ? "#64748b" : "rgba(255,255,255,0.6)";
  const dividerColor = isLight ? "#e2e8f0" : "rgba(255,255,255,0.12)";
  const lineColor = isLight ? "#e2e8f0" : "rgba(255,255,255,0.12)";
  const lineDark = isLight ? "#cbd5e1" : "rgba(255,255,255,0.18)";
  const accentColor = isLight ? "#0d9488" : "rgba(255,255,255,0.3)";
  const contactColor = isLight ? "#94a3b8" : "rgba(255,255,255,0.4)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "750px",
        backgroundColor: cardBg,
        borderRadius: "10px",
        border: cardBorder,
        padding: "40px 36px",
        gap: "18px",
        boxShadow: cardShadow,
      }}
    >
      {/* Header — sender info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "22px", color: nameColor }}>
          {name}
        </div>
        <div style={{ display: "flex", width: "55%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "40%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "48%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
      </div>

      {/* Divider */}
      <div style={{ display: "flex", width: "100%", height: "2px", backgroundColor: dividerColor }} />

      {/* Date + recipient */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "11px", color: bodyColor }}>
          March 18, 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ display: "flex", width: "50%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
          <div style={{ display: "flex", width: "35%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        </div>
        <div style={{ display: "flex", fontFamily: "Sora", fontSize: "14px", color: headingColor, marginTop: "6px" }}>
          Dear {recipientRole},
        </div>
      </div>

      {/* Opening paragraph — accent left border to highlight */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          borderLeft: `4px solid ${accentColor}`,
          paddingLeft: "16px",
        }}
      >
        <div style={{ display: "flex", width: "95%", height: "5px", backgroundColor: lineDark, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "88%", height: "5px", backgroundColor: lineDark, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "76%", height: "5px", backgroundColor: lineDark, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "82%", height: "5px", backgroundColor: lineDark, borderRadius: "2px" }} />
      </div>

      {/* Body paragraph 1 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <div style={{ display: "flex", width: "92%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "97%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "85%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "90%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "60%", height: "5px", backgroundColor: lineColor, borderRadius: "2px" }} />
      </div>

      {/* Remaining space is empty white */}
    </div>
  );
}
