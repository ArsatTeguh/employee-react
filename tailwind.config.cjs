/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B192C",
        secondary: "#e9f5f3",
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
};
