module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'light': {
            'primary': '#FBFAF5', //white
            'secondary': '#BABABA', // plain gray
            'text': '#161616', //black
          },
          'dark': {
            'primary': '#161616', //black
            'secondary': '#5C7362', //green
            'text': '#FBFAF5', //white
          },
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  