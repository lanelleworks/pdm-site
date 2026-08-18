/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // drawn from the untouched PDM logo
        brand: {
          yellow: "#FFDD00",
          black: "#111111",
        },
        busch: "#F18700",
        // light industrial ground
        paper: "#FFFFFF",
        ground: "#F4F5F7",
        line: "#E4E6EA",
        // dark kept for footer / accents
        ink: {
          DEFAULT: "#0B0F14",
          2: "#151B23",
          3: "#1F2833",
        },
      },
      fontFamily: {
        display: ["Archivo", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.05), 0 4px 16px rgba(16,24,40,0.06)",
        "card-lg": "0 2px 4px rgba(16,24,40,0.06), 0 12px 32px rgba(16,24,40,0.10)",
      },
    },
  },
  plugins: [],
};
