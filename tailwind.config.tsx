// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // Next.js App Router
    './pages/**/*.{js,ts,jsx,tsx}',    // If using Pages directory too
    './components/**/*.{js,ts,jsx,tsx}', // Common components folder
  ],
  theme: {
    extend: {
      colors: {
        // Optional: Customize dark/light mode colors here
        primary: {
          light: '#4f46e5',
          dark: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}

export default config
