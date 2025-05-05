/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lumora-cream': '#FAF3C3', // Brand color - light cream
        'lumora-dark': {
          DEFAULT: '#404F4A', // Updated brand color - dark green from logo
          '700': '#354540',   // Darker variant
          '800': '#2A3632',   // Even darker variant
        },
        'lumora-green': {
          50: '#E6F5EB',
          100: '#C1E5CD',
          200: '#9BD5AF',
          300: '#74C490',
          400: '#4DB472',
          500: '#2D7D46', // Primary
          600: '#256B3D',
          700: '#1D5935',
          800: '#16472C',
          900: '#0F3523',
        },
        'lumora-gold': {
          DEFAULT: '#D4AF37', // Gold color from logo
          50: '#FBF6E3',
          100: '#F7E9BA',
          200: '#F2DC91',
          300: '#ECCF67',
          400: '#E6C33E',
          500: '#D4AF37', // Primary
          600: '#B69221',
          700: '#97761C',
          800: '#785B16',
          900: '#594111',
        },
        'gray': {
          50: '#F7F7F8',
          100: '#EEEEF0',
          200: '#DEDEDF',
          300: '#CACBCD',
          400: '#A8A9AC',
          500: '#87888C',
          600: '#696A6E',
          700: '#4C4D50',
          800: '#323234',
          900: '#17181A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'soft': '0 5px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'glow-green': '0 0 15px rgba(45, 125, 70, 0.35)',
        'glow-gold': '0 0 15px rgba(212, 175, 55, 0.35)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
