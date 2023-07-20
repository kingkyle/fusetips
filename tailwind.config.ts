import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tip-blue": "#2525A9",
        "tip-lightblue": "#3D329B",
        "tip-lightblue2": "#7924c7",
        "tip-orange": "#00ff66",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base: true,
    themes: ["light"],
  },
} satisfies Config;
