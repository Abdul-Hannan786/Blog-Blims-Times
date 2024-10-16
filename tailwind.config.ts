import type { Config } from "tailwindcss";

import daisyui from "daisyui";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
    },
  },
  plugins: [daisyui],
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
          neutral: "#3d4451",
          "base-100": "#000000",
        },
      },
    ],
  },
};
export default config;
