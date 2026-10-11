/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B80000",
        dark: "#141414",
        light: "#FFFFFF",
        softBg: "#FFF5F5",
      },
      fontFamily: {
        inter: ["inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};