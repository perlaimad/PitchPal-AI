/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "system-ui", "sans-serif"],
        display: ["DM Serif Display", "Georgia", "serif"]
      },
      colors: {
        terra: {
          400: "#ad6d5f",
          600: "#854c3d"
        },
        teal: {
          500: "#168466"
        },
        ink: "#181614"
      }
    }
  },
  plugins: []
};
