/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-alpino)", "sans-serif"],
      },
      colors: {
        brand: {
          coral: "#FF5C3A",
          "coral-dark": "#E04420",
          sapphire: "#1A3A6E",
          "sapphire-light": "#2A5299",
          gold: "#FEE832",
          "gold-dark": "#E8D020",
          mint: "#D9F99D",
          surface: "#FDE047",
        },
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0px)", opacity: "0.8" },
          "100%": { transform: "translateY(-30px)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0px rgba(255, 92, 58, 0.4)" },
          "50%": { boxShadow: "0 0 24px rgba(255, 92, 58, 0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 3s linear infinite",
        "spin-slow": "spin 6s linear infinite",
        "float-up": "float-up 2s ease-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        marquee: "marquee 18s linear infinite",
      },
    },
  },
};
