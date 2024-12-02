import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

import daisyui from "daisyui";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.5)",
      },
      prose: {
        light: "#ff0000",
        dark: "#d1d5db"
      }
    },
    screens: {
      "sm": "600px",
      "md": "768px",
      "lg": "920px",
      "xl": "1200px",
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: [
      "cmyk",
      "luxury",
      "sunset",
      "black",
      {
        mytheme: {
          primary: "#001d3d",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#ffffff",
          "base-100": "#000000",
          "base-200": "#4b5563",
        },
      },
    ],
  },
};
export default config;
