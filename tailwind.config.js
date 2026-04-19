/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'electric-purple': '#6B20E8',
          'pure-white': '#FFFFFF',
          'deep-navy': '#0D0D1A',
          'lavender': '#9B59D4',
          'electric-coral': '#FF5C35',
          'soft-lavender': '#E8DAFF',
          'charcoal': '#2D2D3A',
        }
      },
      fontFamily: {
        display: ['Montserrat', 'IBM Plex Arabic', 'sans-serif'],
        body: ['Inter', 'IBM Plex Arabic', 'sans-serif'],
        arabic: ['IBM Plex Arabic', 'sans-serif'],
      },
      fontSize: {
        'h1': ['72px', { lineHeight: '1.2', fontWeight: '800' }],
        'h2': ['48px', { lineHeight: '1.2', fontWeight: '800' }],
        'h3': ['32px', { lineHeight: '1.2', fontWeight: '800' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-purple': 'pulsePurple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulsePurple: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.7', transform: 'scale(0.98)' },
        }
      },
      boxShadow: {
        'ambient': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elite-glow': '0 0 20px rgba(107, 32, 232, 0.15), 0 10px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'coral-glow': '0 0 25px rgba(255, 92, 53, 0.35), 0 10px 30px rgba(255, 92, 53, 0.15)',
      },
      borderRadius: {
        'codo': '14px',
      }
    },
  },
  plugins: [],
}
