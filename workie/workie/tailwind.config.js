
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark_bg_1: "#e8eded",
        dark_bg_2: "#d7d9d9",
        dark_bg_3: "#f0f1f2",
        dark_bg_4: "#f0f1f2",
        dark_bg_5: "#f0f1f2",
        dark_bg_6: "#f0f1f2",
        dark_border_1: "#e8eded",
        dark_border_2: "#e8eded",
        dark_hover_1: "#e8eded",
        dark_svg_1: "#474747",
        dark_svg_2: "#474747",
        blue_1: "#5ce3b6",
        blue_2: "#5ce3b6",
        dark_text_1: "#161717",
        dark_text_2: "#161717",
        dark_text_3: "#161717",
        dark_text_4: "#161717",
        dark_text_5: "#161717",
        dark_scrollbar: "#374045",
        green_1: "#5ce3b6",
        green_2: "#5ce3b6",
        green_3: "#5ce3b6",
        green_4: "#5ce3b6",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
