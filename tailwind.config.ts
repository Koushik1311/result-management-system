import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.75rem",
        xl: "1.5rem",
      },
      screens: {
        xl: "1270px",
      },
    },
    extend: {
      colors: {
        color1: "#7C3AED",
        color2: "#DEE5E5",
        color3: "#E84855",
        color4: "#070707",
        color5: "#262730",
      },
    },
  },
  plugins: [],
};
export default config;
