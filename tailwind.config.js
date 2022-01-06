const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        tetriary: "#0c001c",
        crimson: "#DC143c",
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {
      border: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
