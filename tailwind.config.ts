import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 極淡柔霧系
        soft: {
          mist: "#F8F6F4",
          blush: "#F5E8E4",
          lavender: "#EDE7F0",
          sage: "#E8EDE7",
          sand: "#F0EBE3",
        },
        // 微光色系
        glow: {
          soft: "#FFF9E7",
          warm: "#F5E6D3",
          gentle: "#E8DCC8",
          subtle: "#D4C4A8",
        },
        // 強調色
        accent: {
          rose: "#D4B5B0",
          mauve: "#C8B5C8",
          moss: "#B5C4B0",
          clay: "#C8BCB0",
        },
        // 文字色
        charcoal: {
          light: "#6B6B6B",
          DEFAULT: "#3A3A3A",
          dark: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans-tc)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
