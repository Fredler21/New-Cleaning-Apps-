import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        premium: {
          navy: "#060f23",
          charcoal: "#121722",
          teal: "#158a92",
          gold: "#c9a56a",
          mist: "#e3e9ee"
        }
      },
      borderRadius: {
        premium: "1rem"
      },
      boxShadow: {
        premium: "0 30px 70px -34px rgba(0,0,0,0.78)",
        glass: "0 20px 45px -28px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14)"
      },
      backgroundImage: {
        luxury:
          "linear-gradient(145deg, rgba(6,15,35,1) 0%, rgba(18,23,34,1) 55%, rgba(16,56,60,1) 100%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
