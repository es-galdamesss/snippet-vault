/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta dark mode personalizada
        dark: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          hover: '#1c2128'
        },
        accent: {
          primary: '#58a6ff',
          secondary: '#8b949e',
          success: '#3fb950',
          danger: '#f85149',
          warning: '#d29922'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace']
      }
    },
  },
  plugins: [],
}
