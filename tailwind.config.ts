import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:  "#F6F3EE",
        "paper-dark": "#EDE9E1",
        ink:    "#12100D",
        "ink-mid":   "#3A3731",
        "ink-light": "#6B6760",
        "ink-faint": "#A09C95",
        border: "#CCC8BF",
        "border-light": "#E2DED6",
        amber:  "#B5450A",
        "amber-light": "#F5EDE6",
        "cc-blue":  "#1347CC",
        "cc-green": "#0A6E4E",
        "cc-red":   "#C0260F",
        "cc-purple":"#6B2FA0",
        "cc-teal":  "#0D7070",
        "dark-bg":  "#12100D",
        "dark-mid": "#1E1B17",
        slate: { 950: "#0f172a" },
      },
      fontFamily: {
        serif:  ["'Playfair Display'", "Georgia", "serif"],
        body:   ["'Source Serif 4'", "Georgia", "serif"],
        mono:   ["'DM Mono'", "'Courier New'", "monospace"],
        sans:   ["'DM Sans'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
