import { JSX } from "canvacord";
import type { Theme } from "../../themes";
import { getLogo, getBrandName, getBrandWebsite } from "../../brand";
import type { LayoutProps } from "./index";

/** "Chart" — bar chart or line chart for trends and ranked comparisons */

interface ChartItem {
  label: string;
  value: number;
  highlight?: boolean;
}

interface ChartLayoutData {
  chartType?: "bar" | "line";
  items?: ChartItem[];
  yLabel?: string;
  source?: string;
}

const DEFAULT_BAR_ITEMS: ChartItem[] = [
  { label: "Professional Summary", value: 85, highlight: true },
  { label: "Work Experience", value: 72 },
  { label: "Skills Section", value: 58 },
  { label: "Education", value: 41 },
  { label: "Certifications", value: 28 },
];

const DEFAULT_LINE_ITEMS: ChartItem[] = [
  { label: "Month 1", value: 5 },
  { label: "Month 2", value: 18 },
  { label: "Month 3", value: 42 },
  { label: "Month 4", value: 65 },
  { label: "Month 5", value: 82 },
  { label: "Month 6", value: 91, highlight: true },
];

function renderBarChart(items: ChartItem[], t: Theme): JSX.Element {
  const maxValue = Math.max(...items.map((d) => d.value));
  const barColor = t.accent;
  const barMuted = `${t.accent}40`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
      {items.map((item, i) => {
        const pct = Math.round((item.value / maxValue) * 100);
        const isHighlight = item.highlight ?? i === 0;
        const color = isHighlight ? barColor : barMuted;
        const labelColor = isHighlight ? "#ffffff" : "rgba(255,255,255,0.6)";
        const valueColor = isHighlight ? barColor : "rgba(255,255,255,0.5)";

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {/* Label row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Sora SemiBold",
                  fontSize: "26px",
                  color: labelColor,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "IBM Plex Mono",
                  fontSize: "28px",
                  color: valueColor,
                  letterSpacing: "-1px",
                }}
              >
                {item.value}%
              </div>
            </div>
            {/* Bar track */}
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "28px",
                backgroundColor: "rgba(255,255,255,0.04)",
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Filled bar */}
              <div
                style={{
                  display: "flex",
                  width: `${pct}%`,
                  height: "100%",
                  backgroundColor: color,
                  borderRadius: "14px",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderLineChart(items: ChartItem[], t: Theme, yLabel?: string): JSX.Element {
  const maxValue = Math.max(...items.map((d) => d.value));
  const n = items.length;

  // Chart area dimensions
  const chartW = 920;
  const chartH = 340;
  const padL = 64;
  const padR = 20;
  const padT = 24;
  const padB = 16;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  // Compute data point positions
  const points = items.map((item, i) => ({
    x: padL + (n > 1 ? i * (plotW / (n - 1)) : plotW / 2),
    y: padT + (1 - item.value / maxValue) * plotH,
    value: item.value,
    label: item.label,
    highlight: item.highlight,
  }));

  // Build SVG path strings
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[n - 1].x},${padT + plotH} L ${points[0].x},${padT + plotH} Z`;

  // Grid lines at 25%, 50%, 75%, 100%
  const gridLines = [0.25, 0.5, 0.75, 1.0];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative" }}>
      {/* Y-axis label */}
      {yLabel && (
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "8px",
          }}
        >
          {yLabel}
        </div>
      )}

      {/* Chart container (SVG + overlaid div labels) */}
      <div style={{ display: "flex", position: "relative", width: `${chartW}px`, height: `${chartH}px` }}>
        {/* SVG Chart — lines, area, dots only */}
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          width={chartW}
          height={chartH}
          style={{ display: "flex", position: "absolute", top: "0", left: "0" } as Record<string, string>}
        >
          {/* Grid lines */}
          {gridLines.map((pct, i) => {
            const y = padT + (1 - pct) * plotH;
            return (
              <line
                key={`grid-${i}`}
                x1={padL}
                y1={y}
                x2={chartW - padR}
                y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={1}
              />
            );
          })}

          {/* Baseline */}
          <line
            x1={padL}
            y1={padT + plotH}
            x2={chartW - padR}
            y2={padT + plotH}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />

          {/* Area fill */}
          <path d={areaPath} fill={`${t.accent}`} opacity={0.12} />

          {/* Line */}
          <path d={linePath} fill="none" stroke={t.accent} strokeWidth={3} strokeLinejoin="round" />

          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r={p.highlight ? 8 : 6}
              fill={p.highlight ? t.accent : `${t.accent}cc`}
              stroke={p.highlight ? "#ffffff" : "none"}
              strokeWidth={p.highlight ? 2 : 0}
            />
          ))}
        </svg>

        {/* Y-axis grid labels — rendered as divs overlaying the SVG */}
        {gridLines.map((pct, i) => {
          const y = padT + (1 - pct) * plotH;
          const val = Math.round(pct * maxValue);
          return (
            <div
              key={`glabel-${i}`}
              style={{
                display: "flex",
                position: "absolute",
                top: `${y - 10}px`,
                left: "0px",
                width: `${padL - 12}px`,
                justifyContent: "flex-end",
                fontFamily: "IBM Plex Mono",
                fontSize: "18px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {val}
            </div>
          );
        })}
      </div>

      {/* X-axis labels below chart */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: `${padL}px`,
          paddingRight: `${padR}px`,
          marginTop: "4px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: "20px",
              color: item.highlight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)",
              textAlign: "center",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function render(props: LayoutProps, t: Theme): JSX.Element {
  const { title, subtitle, author, date, layoutData } = props;

  const ld = layoutData as ChartLayoutData | undefined;
  const chartType = ld?.chartType ?? "bar";
  const items = ld?.items ?? (chartType === "line" ? DEFAULT_LINE_ITEMS : DEFAULT_BAR_ITEMS);
  const yLabel = ld?.yLabel;
  const source = ld?.source ?? "";

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
      {/* Decorative ring */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-100px",
          right: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "160px",
          border: `1px solid ${t.accent}12`,
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
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Sora ExtraBold",
            fontSize: "46px",
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
              fontSize: "28px",
              color: "rgba(255,255,255,0.45)",
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

      {/* Chart area */}
      {chartType === "line" ? renderLineChart(items, t, yLabel) : renderBarChart(items, t)}

      {/* Source + Footer */}
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
