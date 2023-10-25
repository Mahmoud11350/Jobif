/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        mainColor: "#2CB1BC",
        btnHover: "#0E7C86",
        background: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
