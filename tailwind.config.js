/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0708",
        "ink-soft": "#1B1B1F",
        "ink-900": "#0A0A0B",
        brand: "#E6161F",
        flame: "#E7000B",
        lime: "#D7FF5F",
        mist: "#F3F4F6",
        "mist-2": "#F4F4F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: { shell: "1200px" },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        fadeUp: { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        fadeUp: "fadeUp .6s ease-out both",
      },
    },
  },
  plugins: [],
};
