import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf7f1',
          100: '#f5ecd9',
          200: '#e8d5a8',
          300: '#dab86d',
          400: '#ce9e45',
          500: '#c28a36',
          600: '#a56d2b',
          700: '#855224',
          800: '#6e4322',
          900: '#5c3820',
        },
        sidebar: '#3d3238',
        cream: '#faf7f2'
      }
    },
  },
  plugins: [],
}
export default config