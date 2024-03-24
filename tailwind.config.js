/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        menu_out: {
          from: {
            top: "80px",
            opacity: "1",
          },
          to: {
            top: "120px",
            opacity: "0",
            display: "none"
          }
        },
        menu_in: {
          from: {
            top: "120px",
            opacity: "0",
          },
          to: {
            top: "80px",
            opacity: "1",
          }
        }
      },
      animation: {
        menu_out: "menu_out 1s ease forwards",
        menu_in: "menu_in 1s ease forwards"
      }
    },
  },
  plugins: [],
}

