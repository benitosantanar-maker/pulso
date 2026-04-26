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
        paper: {
          DEFAULT: "#F6F3EE",
          dark: "#EDE9E1",
        },
        ink: {
          DEFAULT: "#12100D",
          mid: "#3A3731",
          light: "#6B6760",
          faint: "#A09C95",
        },
        ed: {
          amber: "#B5450A",
          "amber-hover": "#8A3208",
          "amber-light": "#F5EDE6",
          blue: "#1347CC",
          "blue-light": "#EBF0FB",
          "blue-mid": "#1A56DB",
          green: "#0A6E4E",
          red: "#C0260F",
          border: "#CCC8BF",
          "border-light": "#E2DED6",
          dark: "#12100D",
          "dark-mid": "#1E1B17",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "Courier New", "monospace"],
        serif: ["Playfair Display", "Georgia", "serif"],
        body: ["Source Serif 4", "Georgia", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
