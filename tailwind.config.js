module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', 
  theme: {
      extend: {
          colors: {
              'light': {
                  'primary': '#ffffff', // white
                  'secondary': '#f8f8f8', // light gray
                  'text': '#333333', // dark gray
              },
              'dark': {
                  'primary': '#333333', // dark gray
                  'secondary': '#1a1a1a', // almost black
                  'text': '#ffffff', // white
              },
          },
      },
  },
  variants: {
      extend: {},
  },
  plugins: [],
}
