/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Pinyon Script"', "cursive"],
        sans: ['"Cormorant Garamond"', "serif"],
      },
    },
  },
  plugins: [],
};
