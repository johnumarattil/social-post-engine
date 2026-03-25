export interface ThemeVariant {
  theme: string;
  accentColor?: string;
}

/**
 * Returns the light theme. Kept for API compatibility.
 */
export function pickThemeVariant(_index: number): ThemeVariant {
  return { theme: "light" };
}
