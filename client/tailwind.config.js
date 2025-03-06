/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F72585",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F0F1F3",
          foreground: "#7209B7",
        },
        accent: {
          DEFAULT: "#3A0CA3",
          foreground: "#7209B7",
        },
        background: "#FAFAFB",
        foreground: "#7209B7",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#7209B7",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#7209B7",
        },
        muted: {
          DEFAULT: "#F0F1F3",
          foreground: "#3A0CA3",
        },
        destructive: {
          DEFAULT: "#FF4C4C",
          foreground: "#FFFFFF",
        },
        border: "#E0E0E0",
        input: "#E0E0E0",
        ring: "#F72585",
        chart: {
          1: "#FF6F61",
          2: "#4CAF50",
          3: "#03A9F4",
          4: "#FFC107",
          5: "#8E44AD",
        },
      },
      borderRadius: {
        sm: "0.125rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        heading: "28px",
        body: "16px",
      },
      fontWeight: {
        heading: "600",
        body: "400",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
