/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
      colors: {
        primary: '#3490dc',
        secondary: '#f6993f',
        accent: '#6574cd',
        dark: {
          'primary': '#000',
          'secondary': '#030303'
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      spacing: {
        '.25': '0.25rem',
        '.5': '0.5rem',
        '.75': '0.75rem',
        '1': '1rem',
        '1.25': '1.25rem',
        '1.5': '1.5rem',
        '1.75': '1.75rem',
        '2': '2rem'
      },
      screens: {
        'xs': '550px',
        'sm': '720px',
        'base': '960',
        'lg': '1200px',
        'xl': '1350px',
        '2xl': '1536px'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark:hover'],
      borderColor: ['dark'],
      textColor: ['dark']
    }
  },
  plugins: [require("tailwindcss-animate")]
};
