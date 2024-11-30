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
        'custom-bg': 'conic-gradient(at bottom right, #000000, #150050, #3f0071)', // Corrected conic gradient
      },
    },
  },
  plugins: [],
}
