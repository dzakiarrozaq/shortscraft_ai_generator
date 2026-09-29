import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBF9F6", // Broken White
        foreground: "#231F1D", // Deep Warm Espresso
        card: {
          DEFAULT: "#FFFFFF",
          low: "#F5F3F0",
        },
        border: "#E8E5E0", // Soft Taupe
        primary: {
          DEFAULT: "#231F1D", // Deep Warm Espresso
          foreground: "#FBF9F6",
        },
        accent: {
          DEFAULT: "#8C7D70", // Warm Sand / Clay
          foreground: "#FBF9F6",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
