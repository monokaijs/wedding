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
        text: '#170808',
        primary0: '#f39f8a',
        primary1: '#ffa791',
        primary2: '#ffb69e',
        primary3: '#ffd5b3',
        primary4: '#fde7b1',
        primary5: '#fff9c2',
        autumn0: '#3f401f',
        autumn1: '#763b3b',
        autumn2: '#592821',
        autumn3: '#d68125',
        autumn4: '#d0998a',
      },
      fontFamily: {
        moncheri: ["var(--font-moncheri)"],
        alegreya: ["var(--font-alegreya)"],
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
};
export default config;
