/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#243444", // Azul
        secondary: "#e50744", // Laranja
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
