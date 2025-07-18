const colors = require('./styles/colors').default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include all component files
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Main colors
        background: colors.background,
        secondary: colors.secondary,

        subBackground: colors.subBackground,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        primary: colors.primary,

        // Light theme colors
        deepBlue: colors.light.deepBlue,
        textDeepBlue: colors.light.textDeepBlue,
        lightBlue: colors.light.lightBlue,
        seafoam: colors.light.seafoam,
        paleSand: colors.light.paleSand,
      },
    },
  },
  plugins: [],
}
