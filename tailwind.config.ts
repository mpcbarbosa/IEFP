import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        iefp: {
          bg: '#EEF4F3',
          ink: '#0B2B2A',
          muted: '#5B6B6A',
          card: '#FFFFFF',
          line: 'rgba(11,43,42,0.10)'
        },
        program: {
          apz: '#C81D3A',
          efa: '#1E8E5A',
          ccd: '#7D2EA8',
          pla: '#7FBF3B',
          jd: '#2F86C7',
          qi: '#12B3A6',
          va: '#0B6B6B'
        }
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.06)',
        card: '0 14px 40px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
