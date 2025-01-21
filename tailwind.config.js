/** @type {import('tailwindcss').Config} */

const duneGradient = "linear-gradient(to bottom left, #ECA400, #a35b1f)";
const expanseGradient =
  "linear-gradient(to bottom right, #2dbfd4 0%, #2dbfd4 70%, #F4EFE8 100%)";
const nightGradient = "radial-gradient(circle, #181818 30%, #202020 100%)";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
      },

      borderColor: {
        "dune-gradient": duneGradient,
        "expanse-gradient": expanseGradient,
      },
      backgroundImage: {
        namibia: "url('/images/namibia.jpg')",
        "dune-gradient": duneGradient,
        "expanse-gradient": expanseGradient,
        "night-gradient": nightGradient,
      },
      colors: {
        "dune-gradient": duneGradient,
        "expanse-gradient": expanseGradient,
        "night-gradient": nightGradient,

        stars: {
          100: "#F4EFE8",
          200: "#F9F5F0",
          300: "#FDF5F1",
        },
        expanse: {
          100: "#2dbfd4",
          200: "#66ADD9",
          300: "#4184BF",
          400: "#3163AC",
        },
        dune: {
          100: "#ECA400",
          200: "#BF7C41",
          300: "#A6592D",
          400: "#a35b1f",
        },
        night: {
          100: "#3A3A3A",
          200: "#292929",
          300: "#202020",
          400: "#181818",
        },
        success: {
          100: "#6CC36D",
          200: "#4CAF50",
          300: "#388E3C",
          400: "#2E7D32",
        },
        error: {
          100: "#C62828",
          200: "#B71C1C",
        },
        "trash-panda": {
          100: "#BFB7B4",
          button: "#031D40",
        },
      },
      fontFamily: {
        fjalla: ['"Fjalla One"', "sans-serif"],
        raleway: ['"Raleway Variable"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
