module.exports = {
  purge: [],
  darkMode: true,
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // we’ll duplicate the row, so 50%
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
