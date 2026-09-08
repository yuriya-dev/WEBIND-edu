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
        background: "#FFFFFF",
        secondary: "#EAEAEA",
        primary: "#111111",
        accent: "#B7FF00",
        "text-main": "#111111",
        "text-muted": "#6B7280",
        border: "#EAEAEA",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        lg: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
