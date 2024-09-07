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
        "normal-black": "#111111",
        primary: "#5200FF",
        "normal-gray": "#EBEBEB",
      },
      fontFamily: {
        sans: ["Noto Sans KR"],
      },
    },
  },
  plugins: [],
};
export default config;
