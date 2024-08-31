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
        black: "#222222", 
        red: "#2E87FF",
        primary: "#19194d",
      },
      fontFamily: {
        UhBeeSe: ["UhBeeSe", "sans-serif"],
        Seo: ["Seo"],
        Gowun: ["Gowun"],
        Rixfont: ["Rixfont"],
        SFHAM: ["SFHAM"],
      },
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
  
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }
  
        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
  
        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }
  
        sm: { max: "600px" },
        // => @media (max-width: 639px) { ... }
        sx: { min: "767px" },
      },
      }

    },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
