/** @type {import('tailwindcss').Config} */
import trac from "tailwindcss-react-aria-components";
import contQueries from "@tailwindcss/container-queries";

export default {
  content: ["./index.html", "./download.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.4rem",
      sm: "0.8rem",
      base: "0.925rem",
      lg: "1.05rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui"],
      },
      colors: {
        primary: "#22c55e",
        "primary-content": "#041f0d",
        secondary: "#eab308",
        accent: "#facc15",
        "base-content": "#e7f5ea",
        "base-100": "#151f18",
        "base-200": "#0e1510",
        "base-300": "#070b08",
      },
    },

    fontFamily: {
      keycap: ["Inter", "system-ui"],
    },
  },
  plugins: [contQueries, trac({ prefix: "rac" })],
};
