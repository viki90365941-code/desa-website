/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0B4F3F",
          dark: "#083A2E",
          light: "#146856",
        },
        gold: {
          DEFAULT: "#E4A322",
          light: "#F3C463",
          dark: "#B9800F",
        },
        clay: {
          DEFAULT: "#A6483A",
          light: "#C97160",
        },
        paper: "#F6F4EC",
        paper2: "#EFEBDD",
        ink: "#1C2321",
        mist: "#5C6B64",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        terrace: "linear-gradient(180deg, rgba(11,79,63,0) 0%, rgba(11,79,63,1) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}

