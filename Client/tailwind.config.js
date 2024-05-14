/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#008080"
      },
      fontFamily:{
        arial: "Arial, sans-serif"
      },
      fontSize:{
        md : "1.65rem",
        sm2 : "1rem"
      },
      boxShadow:{
        md : '0 0 10px #ccc'
      }
    },
  },
  plugins: [],
}

