import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        panel: "var(--color-panel)",
        "panel-soft": "var(--color-panel-soft)",
        "stroke-soft": "var(--color-stroke-soft)",
        ink: "var(--color-ink)",
        "ink-dim": "var(--color-ink-dim)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)"
      },
      boxShadow: {
        "ambient-xl": "var(--shadow-ambient-xl)",
        "ambient-lg": "var(--shadow-ambient-lg)",
        "ambient-sm": "var(--shadow-ambient-sm)"
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseDot: {
          "0%, 80%, 100%": { opacity: "0.25" },
          "40%": { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.19, 1, 0.22, 1) both",
        "pulse-dot": "pulseDot 1.3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
