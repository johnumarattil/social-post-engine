import { JSX } from "canvacord";
import { getPersona } from "../../personas";

export interface MiniResumeProps {
  name?: string;
  title?: string;
  avatarDataUri?: string;
  /** "light" = dark text on white card, "on-accent" = white text on translucent card */
  variant?: "light" | "on-accent";
}

const DEFAULT_PERSONA = getPersona("default");

export function MiniResume(props: MiniResumeProps): JSX.Element {
  const name = props.name ?? DEFAULT_PERSONA.name;
  const title = props.title ?? DEFAULT_PERSONA.title;
  const avatarSrc = props.avatarDataUri ?? DEFAULT_PERSONA.avatarDataUri;
  const variant = props.variant ?? "light";

  const isLight = variant === "light";
  const cardBg = isLight ? "#ffffff" : "rgba(255,255,255,0.15)";
  const cardBorder = isLight ? "1.5px solid #d1d5db" : "none";
  const cardShadow = isLight ? "4px 8px 24px rgba(0,0,0,0.12)" : "none";
  const photoBg = isLight ? "#c7d2e0" : "rgba(255,255,255,0.2)";
  const photoBorder = isLight ? "2px solid #94a3b8" : "none";
  const nameColor = isLight ? "#1e293b" : "#ffffff";
  const titleColor = isLight ? "#64748b" : "rgba(255,255,255,0.6)";
  const contactColor = isLight ? "#94a3b8" : "rgba(255,255,255,0.4)";
  const sectionColor = isLight ? "#475569" : "rgba(255,255,255,0.7)";
  const subheadColor = isLight ? "#64748b" : "rgba(255,255,255,0.5)";
  const dividerColor = isLight ? "#e2e8f0" : "rgba(255,255,255,0.12)";
  const lineColor = isLight ? "#e2e8f0" : "rgba(255,255,255,0.12)";
  const lineDark = isLight ? "#cbd5e1" : "rgba(255,255,255,0.18)";
  const silhouetteColor = isLight ? "#94a3b8" : "rgba(255,255,255,0.3)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: cardBg,
        borderRadius: "8px",
        border: cardBorder,
        padding: "24px 24px",
        gap: "12px",
        boxShadow: cardShadow,
      }}
    >
      {/* Header — photo + name + title + contact */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            display: "flex",
            width: "52px",
            height: "52px",
            borderRadius: "26px",
            border: photoBorder,
            overflow: "hidden",
          }}
        >
          <img
            src={avatarSrc}
            width={52}
            height={52}
            style={{ display: "flex", objectFit: "cover" as const }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "14px", color: nameColor }}>
            {name}
          </div>
          <div style={{ display: "flex", fontFamily: "Sora", fontSize: "10px", color: titleColor }}>
            {title}
          </div>
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "7px", color: contactColor, marginTop: "3px" }}>
            jane.doe@email.com · (555) 123-4567 · New York, NY
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", width: "100%", height: "1px", backgroundColor: dividerColor }} />

      {/* Summary section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "8px", color: sectionColor, textTransform: "uppercase" as const, letterSpacing: "1.2px" }}>
          Summary
        </div>
        <div style={{ display: "flex", width: "95%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "88%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "72%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
      </div>

      {/* Experience section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "8px", color: sectionColor, textTransform: "uppercase" as const, letterSpacing: "1.2px" }}>
          Experience
        </div>
        {/* Job 1 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", width: "60%", height: "4px", backgroundColor: lineDark, borderRadius: "2px" }} />
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "6px", color: contactColor }}>2022 – Present</div>
        </div>
        <div style={{ display: "flex", width: "45%", height: "3px", backgroundColor: subheadColor, borderRadius: "2px", opacity: 0.4 }} />
        <div style={{ display: "flex", width: "92%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "85%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "78%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
        {/* Job 2 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
          <div style={{ display: "flex", width: "55%", height: "4px", backgroundColor: lineDark, borderRadius: "2px" }} />
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "6px", color: contactColor }}>2019 – 2022</div>
        </div>
        <div style={{ display: "flex", width: "40%", height: "3px", backgroundColor: subheadColor, borderRadius: "2px", opacity: 0.4 }} />
        <div style={{ display: "flex", width: "90%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "72%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
      </div>

      {/* Skills section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "8px", color: sectionColor, textTransform: "uppercase" as const, letterSpacing: "1.2px" }}>
          Skills
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["22%", "18%", "15%", "20%", "25%", "16%"].map((w, i) => (
            <div key={`skill-${i}`} style={{ display: "flex", width: w, height: "6px", backgroundColor: lineDark, borderRadius: "3px" }} />
          ))}
        </div>
      </div>

      {/* Education section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "8px", color: sectionColor, textTransform: "uppercase" as const, letterSpacing: "1.2px" }}>
          Education
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", width: "65%", height: "4px", backgroundColor: lineDark, borderRadius: "2px" }} />
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "6px", color: contactColor }}>2015 – 2019</div>
        </div>
        <div style={{ display: "flex", width: "50%", height: "3px", backgroundColor: lineColor, borderRadius: "2px" }} />
      </div>

      {/* Certifications section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "8px", color: sectionColor, textTransform: "uppercase" as const, letterSpacing: "1.2px" }}>
          Certifications
        </div>
        <div style={{ display: "flex", width: "58%", height: "3px", backgroundColor: lineDark, borderRadius: "2px" }} />
        <div style={{ display: "flex", width: "45%", height: "3px", backgroundColor: lineDark, borderRadius: "2px" }} />
      </div>
    </div>
  );
}
