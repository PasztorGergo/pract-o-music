/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx,jsx}",
    "./styles/**/*.{js,ts,tsx,jsx}",
    "./pages/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#1F1D35",
          base: "#070423",
        },
      },
    },
  },
  plugins: [],
};
