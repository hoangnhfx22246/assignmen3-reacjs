/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "#212529",
      },
      keyframes: {
        appear: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        opacity_in: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shake: {
          "0%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(8deg)" },
          "100%": { transform: "rotate(0)" },
        },
      },
      animation: {
        appear: "appear 1.5s ease-in-out",
        livechat: "appear .4s ease-in-out, shake .4s ease-in ",
      },
    },
  },
  plugins: [],
};
