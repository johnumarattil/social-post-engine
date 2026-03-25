export interface Theme {
  background: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentText: string;
}

export const themes: Record<string, Theme> = {
  light: {
    background: "linear-gradient(135deg, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%)",
    textPrimary: "#064e3b",
    textSecondary: "#047857",
    accent: "#10b981",
    accentText: "#ffffff",
  },
};

export function getTheme(_name?: string, accentColor?: string): Theme {
  const theme = themes.light;
  if (accentColor) {
    return { ...theme, accent: accentColor };
  }
  return theme;
}
