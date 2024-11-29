/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(270deg, #B76BFF 0%, #DFC2FC 50%, #ECECEC 100%)',
      },
    },
  },
  plugins: [],
}

