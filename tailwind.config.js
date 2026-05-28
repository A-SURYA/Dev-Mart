/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0D0D0D",
          50: "#F7F7F5",
          100: "#EFEFEB",
          200: "#D8D8D0",
          300: "#B8B8AC",
          400: "#8C8C80",
          500: "#5C5C52",
          600: "#3D3D35",
          700: "#2A2A24",
          800: "#1A1A16",
          900: "#0D0D0D",
        },
        accent: {
          DEFAULT: "#E8FF47",
          dark: "#C8DF20",
        },
        sand: {
          DEFAULT: "#F5F0E8",
          dark: "#E8E0D0",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
