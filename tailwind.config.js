/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f626a',
          dark: '#0a474d',
          light: '#eaf4f5',
          hover: '#13747d',
          50: '#f0f9fa',
          100: '#d7f0f2',
          500: '#0f626a',
          600: '#0c5259',
          700: '#094146',
          800: '#073337',
          900: '#052528',
        },
        madrasha: {
          bg: '#f6f7fa',
          surface: '#ffffff',
          text: '#082f32',
          muted: '#556b6d',
          border: '#e2e8f0',
          secondary: '#626262',
          success: '#0ab964',
          danger: '#e14e5a',
          warning: '#f9c123',
          info: '#4196fa',
        }
      },
      fontFamily: {
        bangla: ['SolaimanLipi', 'Noto Sans Bengali', 'Hind Siliguri', 'sans-serif'],
        sans: ['Inter', 'Rubik', 'SolaimanLipi', 'Noto Sans Bengali', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        madrasha: '0 4px 12px 0 rgba(15, 98, 106, 0.08)',
        hover: '0 8px 24px -4px rgba(15, 98, 106, 0.12)',
      }
    },
  },
  plugins: [],
}
