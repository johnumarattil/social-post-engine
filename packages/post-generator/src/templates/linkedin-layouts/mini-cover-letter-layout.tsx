import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";
import { MiniCoverLetter } from "./mini-cover-letter";

export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;

  const name = (layoutData?.name as string) ?? "Jane Doe";
  const recipientRole = (layoutData?.recipientRole as string) ?? "Hiring Manager";
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
        gap: "28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative ring */}
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
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {getBrandName()}
        </div>
      </div>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "2px",
            backgroundImage: `linear-gradient(90deg, ${t.accent} 0%, ${dividerColor} 60%, transparent 100%)`,
            marginTop: "4px",
          }}
        />
      </div>

      {/* Mini cover letter card — centered */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
        }}
      >
        <MiniCoverLetter name={name} recipientRole={recipientRole} variant="light" />
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {author && (
            <div
              style={{
                display: "flex",
                fontFamily: "Sora SemiBold",
                fontSize: "18px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {author}
            </div>
          )}
          {author && date && (
            <div
              style={{
                display: "flex",
                fontFamily: "Sora",
                fontSize: "16px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              ·
            </div>
          )}
          {date && (
            <div
              style={{
                display: "flex",
                fontFamily: "IBM Plex Mono",
                fontSize: "16px",
                color: "rgba(255,255,255,0.3)",
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
            fontSize: "22px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {getBrandWebsite()}
        </div>
      </div>
    </div>
  );
}
