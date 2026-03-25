import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";
import { MiniCoverLetter } from "./mini-cover-letter";
import { getPersona } from "../../personas";

/** "Checklist" — action item rows with checkbox icons, title as heading */
const DEFAULT_ITEMS = [
  { text: "Review job description keywords", checked: true },
  { text: "Quantify achievements with metrics", checked: true },
  { text: "Tailor summary to role", checked: false },
  { text: "Proofread for errors", checked: false },
];

export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;

  const items: { text: string; checked: boolean }[] =
    (layoutData?.items as { text: string; checked: boolean }[] | undefined) ?? DEFAULT_ITEMS;

  const persona = getPersona(title);
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
          { getBrandName() }
        </div>
      </div>

      {/* Title as checklist heading */}
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
        {/* Accent divider */}
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

      {/* Checklist rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Checkbox */}
            <div
              style={{
                display: "flex",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: item.checked
                  ? `2px solid ${t.accent}`
                  : `2px solid rgba(255,255,255,0.2)`,
                backgroundColor: item.checked ? `${t.accent}20` : "transparent",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.checked && (
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Sora SemiBold",
                    fontSize: "22px",
                    color: t.accent,
                  }}
                >
                  ✓
                </div>
              )}
            </div>
            {/* Item text */}
            <div
              style={{
                display: "flex",
                fontFamily: "Sora SemiBold",
                fontSize: "28px",
                color: item.checked ? "#ffffff" : "rgba(255,255,255,0.5)",
                lineHeight: 1.3,
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Mini cover letter — bleeding off right + bottom edges */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "-40px",
          bottom: "-300px",
          width: "540px",
        }}
      >
        <MiniCoverLetter name={persona.name} variant="light" />
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
          { getBrandWebsite() }
        </div>
      </div>
    </div>
  );
}
