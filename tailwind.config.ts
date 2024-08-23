import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000", 
        red: "#2E87FF",
        primary: "#19194d",
      },
      fontFamily: {
        UhBeeSe: ["UhBeeSe", "sans-serif"],
        Seo: ["Seo"],
        Gowun: ["Gowun"],
      },
      }

    },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
