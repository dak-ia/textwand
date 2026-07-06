export type Theme = "auto" | "light" | "dark";

const VALID_THEMES: readonly Theme[] = ["auto", "light", "dark"];

export const parseTheme = (value: string | null): Theme =>
  VALID_THEMES.includes(value as Theme) ? (value as Theme) : "auto";
