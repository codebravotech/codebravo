/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        namibia: "url('/images/namibia.jpg')",
      },
      colors: {},
      fontFamily: {
        fjalla: ['"Fjalla One"', "sans-serif"],
        raleway: ['"Raleway Variable"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
