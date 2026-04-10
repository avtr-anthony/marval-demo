/**
 * Centralized visual tokens for the demo.
 * Update this object to quickly change palette, radius, shadows and spacing.
 */
export const themeTokens = {
  colors: {
    bg: "#050506",
    panel: "#0f1012",
    panelSoft: "#17181b",
    strokeSoft: "rgba(255, 255, 255, 0.14)",
    ink: "#f5f5f5",
    inkDim: "#adadb3",
    accent: "#f2f2f2",
    accentSoft: "rgba(255, 255, 255, 0.16)",
    success: "#b8e0c8",
    warning: "#e8cfad",
    danger: "#efb0b0"
  },
  radius: {
    pill: "999px",
    card: "20px",
    panel: "28px"
  },
  shadow: {
    ambientXl: "0 28px 80px -28px rgba(0, 0, 0, 0.8)",
    ambientLg: "0 20px 45px -30px rgba(0, 0, 0, 0.8)",
    ambientSm: "0 10px 26px -18px rgba(0, 0, 0, 0.9)"
  },
  spacing: {
    sectionY: "clamp(5rem, 8vw, 8rem)",
    sectionYCompact: "clamp(3.5rem, 6vw, 5rem)"
  }
} as const;

/**
 * Builds CSS custom properties from the token object so Tailwind and custom CSS share the same values.
 */
export function buildThemeCssVariables() {
  return `
    :root {
      --color-bg: ${themeTokens.colors.bg};
      --color-panel: ${themeTokens.colors.panel};
      --color-panel-soft: ${themeTokens.colors.panelSoft};
      --color-stroke-soft: ${themeTokens.colors.strokeSoft};
      --color-ink: ${themeTokens.colors.ink};
      --color-ink-dim: ${themeTokens.colors.inkDim};
      --color-accent: ${themeTokens.colors.accent};
      --color-accent-soft: ${themeTokens.colors.accentSoft};
      --color-success: ${themeTokens.colors.success};
      --color-warning: ${themeTokens.colors.warning};
      --color-danger: ${themeTokens.colors.danger};
      --radius-pill: ${themeTokens.radius.pill};
      --radius-card: ${themeTokens.radius.card};
      --radius-panel: ${themeTokens.radius.panel};
      --shadow-ambient-xl: ${themeTokens.shadow.ambientXl};
      --shadow-ambient-lg: ${themeTokens.shadow.ambientLg};
      --shadow-ambient-sm: ${themeTokens.shadow.ambientSm};
      --space-section-y: ${themeTokens.spacing.sectionY};
      --space-section-y-compact: ${themeTokens.spacing.sectionYCompact};
    }
  `;
}
