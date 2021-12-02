module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        reddit: "#FF4500",
        twitter: '#1d9bf0',

        pBlue: '#2B2D42',
        pGray: '#8D99AE',
        pLight: '#EDF2F4',
        pRed: "#EF233C",
        pDarkRed: '#D90429',

      }
    },

  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['even', 'odd'],
    },
  },
  plugins: [],
  important: true,
}
