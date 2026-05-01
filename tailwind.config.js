/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#020c1b',
        'bg-secondary': '#0a192f',
        'bg-card': '#112240',
        'bg-card-hover': '#1d2d50',
        'accent-primary': '#64ffda',
        'accent-secondary': '#00bcd4',
        'text-primary': '#e6f1ff',
        'text-secondary': '#8892b0',
        'text-muted': '#495670',
        'border-primary': '#233554',
      },
      fontFamily: {
        outfit: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-sea': 'radial-gradient(circle at top right, #0a192f, #020c1b)',
      },
    },
  },
  plugins: [],
}
