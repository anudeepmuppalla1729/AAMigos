/* Centralized Design Tokens */
const theme = {
  colors: {
    bg: "#0e1117",
    bgCard: "#161b22",
    bgInput: "#0d1117",
    accent: "#c45f2f",
    accentHover: "#d4703f",
    accentGlow: "rgba(196, 95, 47, 0.2)",
    text: "#e6edf3",
    textSecondary: "#8b949e",
    textMuted: "#484f58",
    border: "rgba(255, 255, 255, 0.06)",
    borderFocus: "#c45f2f",
    error: "#f85149",
    errorGlow: "rgba(248, 81, 73, 0.15)",
    success: "#3fb950",
    successGlow: "rgba(63, 185, 80, 0.15)",
    white: "#ffffff",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "50%",
  },
  shadows: {
    card: "0 16px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03)",
    input: "inset 0 1px 4px rgba(0, 0, 0, 0.3)",
    inputFocus: "0 0 0 3px rgba(196, 95, 47, 0.18)",
    button: "0 4px 14px rgba(196, 95, 47, 0.25)",
    buttonHover: "0 8px 24px rgba(196, 95, 47, 0.35)",
    glow: "0 0 80px 20px rgba(196, 95, 47, 0.06)",
  },
  font: {
    family: "'Poppins', sans-serif",
    size: {
      xs: "0.7rem",
      sm: "0.8rem",
      md: "0.9rem",
      lg: "1.1rem",
      xl: "1.35rem",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
};

export default theme;
