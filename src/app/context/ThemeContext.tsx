import { createContext, useContext, useState, type ReactNode } from "react";

export const LIGHT = {
  bg: "#FFFFFF",
  card: "#F5F3FF",
  elevated: "#EDE9FE",
  border: "#E9E3F5",
  primary: "#8A2BE2",
  primaryLight: "#7A22CC",
  primaryGhost: "rgba(138,43,226,0.10)",
  primaryBorder: "rgba(138,43,226,0.25)",
  heading: "#1A0533",
  body: "#3D2C6B",
  muted: "#8B7AA8",
  danger: "#DC2626",
  warning: "#D97706",
  success: "#059669",
} as const;

export const DARK = {
  bg: "#0F0F13",
  card: "#1A1A24",
  elevated: "#22223A",
  border: "#2D2D3D",
  primary: "#8A2BE2",
  primaryLight: "#A855F7",
  primaryGhost: "rgba(138,43,226,0.15)",
  primaryBorder: "rgba(138,43,226,0.30)",
  heading: "#F3F0FF",
  body: "#C4B5FD",
  muted: "#6B7280",
  danger: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
} as const;

export type Colors = typeof LIGHT;

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
  C: Colors;
}

const ThemeContext = createContext<ThemeCtx>({
  isDark: false,
  toggle: () => {},
  C: LIGHT,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle: () => setIsDark((d) => !d),
        C: isDark ? DARK : LIGHT,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
