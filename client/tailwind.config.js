/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Arial', 'sans-serif'],
      },
      colors: {
        // primary: '#ffb783',
        // secondary: '#dc1515',
        // tertiary: '#f5f5f5',
        // accent: '#ff8e3c',
        // paragraph: '#333333',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["coffee"],
    logs: false,
  },
}
