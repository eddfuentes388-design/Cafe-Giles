/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#f7f1ea',
          100: '#ecdfc9',
          200: '#d9bd93',
          300: '#c39a63',
          400: '#a97b45',
          500: '#8a5e34',
          600: '#6f4a2a',
          700: '#553823',
          800: '#3d2818',
          900: '#2a1a10'
        },
        cream: {
          50: '#fffdf9',
          100: '#fdf6ea',
          200: '#f8ecd4'
        },
        forest: {
          500: '#2f4a3c',
          600: '#243a2f',
          700: '#1a2b23',
          800: '#132019'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif']
      },
      boxShadow: {
        premium: '0 10px 40px -10px rgba(42, 26, 16, 0.25)'
      }
    }
  },
  plugins: []
}
