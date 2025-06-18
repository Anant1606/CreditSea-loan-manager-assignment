/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        night: {
          100: "#2b2e3c",
          200: "#1f2029",
          300: "#15161f",
        },
        textPrimary: "#0f172a",
        textSecondary: "#64748b",
      },
    },
  },
  plugins: [],
}
