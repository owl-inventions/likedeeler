/** @type {import('tailwindcss').Config} */

import tailwind_theme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather', ...tailwind_theme.fontFamily.sans],
        serif: ['Merriweather', ...tailwind_theme.fontFamily.serif],
        mono: ['Merriweather', ...tailwind_theme.fontFamily.mono],
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
