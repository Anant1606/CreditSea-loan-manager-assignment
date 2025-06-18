/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary green palette
        primary: {
          50:  "#E9F8EE",
          100: "#C6EFD2",
          200: "#9EDFB1",
          300: "#73CF8E",
          400: "#4ABA6A",
          500: "#28A546",  // Use this for .bg-primary, .text-primary
          600: "#218E3D",
          700: "#187A34",
          800: "#106229",
          900: "#09421A"
        },
        // Soft background
        bg: "#F0F9F4",
        // Text shades
        textPrimary: "#154731",
        textSecondary: "#486D5F"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
