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
        primary: "#3494f4",
        "background-light": "#f8fafd",
        "background-dark": "#0a0f1a",
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "3xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
