import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        th: {
          bg: "var(--bg)",
          "bg-alt": "var(--bg-alt)",
          surface: "var(--surface)",
          "surface-hover": "var(--surface-hover)",
          text: "var(--text)",
          "text-secondary": "var(--text-secondary)",
          muted: "var(--muted)",
          border: "var(--border)",
          "border-hover": "var(--border-hover)",
          card: "var(--card-bg)",
          accent: "var(--accent)",
          "accent-hover": "var(--accent-hover)"
        },
        premium: {
          navy: "#060f23",
          deep: "#0a1128",
          charcoal: "#121722",
          surface: "#1a2035",
          teal: "#0d9488",
          emerald: "#10b981",
          gold: "#c9a56a",
          mist: "#e3e9ee",
          slate: "#94a3b8"
        }
      },
      borderRadius: {
        premium: "1rem",
        card: "1.25rem",
        slider: "1.5rem"
      },
      boxShadow: {
        premium: "0 30px 70px -34px rgba(0,0,0,0.78)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        glow: "0 0 40px rgba(13,148,136,0.15)",
        "card-hover": "var(--card-shadow-hover)",
        card: "var(--card-shadow)",
        slider: "0 8px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.06)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in": "slide-in 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
