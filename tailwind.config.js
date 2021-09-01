module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      'serif': ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace']
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      primary: {
        DEFAULT: '#2962ff',
        2: '#556980'
      },
      'non-active': {
        DEFAULT: '#91a1b3',
        2: '#c8d1db',
      },
      red: '#e53935',
      disabled: '#aeaed5',
      secondary: '#f3f3f4',
    },
    extend: {
      borderRadius: {
        DEFAULT: '5px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
