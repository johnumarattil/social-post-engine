import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";
import { getPersonaWithTitle } from "../../personas";

/** "LinkedIn Profile Card" — profile card top half, title callout bottom (1:1 square) */
export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;
  const persona = getPersonaWithTitle(title, layoutData?.headline as string | undefined);
  const profileName = (layoutData?.profileName as string | undefined) ?? persona.name;
  const headline = (layoutData?.headline as string | undefined) ?? persona.title;
  const location = (layoutData?.location as string | undefined) ?? "San Francisco, CA";
  const aboutSnippet = (layoutData?.aboutSnippet as string | undefined) ?? "Passionate about building brands that resonate. 8+ years in B2B marketing...";
  const initials = profileName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const btnBg = "#0a66c2";
  const btnText = "#ffffff";
  const btnOutlineBorder = "#666666";
  const btnOutlineText = "#666666";
  const openToWorkGreen = "#10b981";
  const bgGradient = `linear-gradient(145deg, ${t.textPrimary} 0%, #021a16 60%, #031f18 100%)`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundImage: bgGradient,
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "48px 56px 0 56px" }}>
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

      {/* Top: Profile card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          margin: "20px 0 0 56px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        <div style={{ display: "flex", width: "100%", height: "100px", backgroundImage: "linear-gradient(135deg, #a8d5ba 0%, #7ec8a0 100%)" }} />

        {/* Profile content */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 32px 28px 32px" }}>
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              width: "88px",
              height: "88px",
              borderRadius: "44px",
              marginTop: "-44px",
              border: "3px solid #ffffff",
              overflow: "hidden",
            }}
          >
            <img
              src={persona.avatarDataUri}
              width={88}
              height={88}
              style={{ display: "flex", objectFit: "cover" as const }}
            />
          </div>

          {/* Open to work */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <div style={{ display: "flex", width: "10px", height: "10px", borderRadius: "5px", backgroundColor: openToWorkGreen }} />
            <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "14px", color: openToWorkGreen }}>Open to work</div>
          </div>

          {/* Name + headline */}
          <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "24px", color: "#191919", marginTop: "10px" }}>{profileName}</div>
          <div style={{ display: "flex", fontFamily: "Sora", fontSize: "18px", color: "#666666", marginTop: "4px", lineHeight: 1.3 }}>{headline}</div>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
            <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "15px", color: "#999999" }}>{location}</div>
            <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "15px", color: "#999999" }}>·</div>
            <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "15px", color: btnBg }}>500+ connections</div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 24px", backgroundColor: btnBg, borderRadius: "22px", fontFamily: "Sora SemiBold", fontSize: "16px", color: btnText }}>Connect</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 24px", borderRadius: "22px", border: `1px solid ${btnOutlineBorder}`, fontFamily: "Sora SemiBold", fontSize: "16px", color: btnOutlineText }}>Message</div>
          </div>

          {/* About */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "18px" }}>
            <div style={{ display: "flex", fontFamily: "Sora SemiBold", fontSize: "16px", color: "#191919" }}>About</div>
            <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "14px", lineHeight: 1.6, color: "#b0b0b0" }}>{aboutSnippet}</div>
          </div>
        </div>
      </div>

      {/* Bottom: Title callout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "24px 56px 48px 56px",
          justifyContent: "flex-start",
          gap: "16px",
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Accent divider */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "2px",
              backgroundImage: `linear-gradient(90deg, ${t.accent} 0%, ${t.accent}50 60%, transparent 100%)`,
            }}
          />
          <div style={{ display: "flex", fontFamily: "Sora ExtraBold", fontSize: "48px", color: "#ffffff", lineHeight: 1.1 }}>{title}</div>
          {subtitle && (
            <div style={{ display: "flex", fontFamily: "Lora Italic", fontSize: "30px", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{subtitle}</div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
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
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: "22px", color: "rgba(255,255,255,0.3)" }}>{ getBrandWebsite() }</div>
        </div>
      </div>
    </div>
  );
}
