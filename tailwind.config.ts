import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: '#FFBB0F',
        secondary: '#1e1e1e',
        gold: '#bc956f',

        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        text: '#333',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        danger: ' #ec1c24',
        'tag-success': 'rgba(0, 254, 30, 0.2)',
        'tag-primary': ' rgba(0, 254, 251, 0.2)',
        'tag-special': 'rgba(236, 28, 36, 0.2)',
        rating: '#ffc107',
        'book-now': '#c3996b',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        default: ['var(--font-overpass)', ...fontFamily.sans],
        secondary: ['var(--font-kapelka)', ...fontFamily.sans],
      },
      screens: {
        '3xl': '2056px',
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },

  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.animate': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
        },
        '.animate-longer': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '500ms',
        },
        '.centered': {
          top: '50%',
          left: '50%',
          '--tw-translate-x': '-50%',
          '--tw-translate-y': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-bottom': {
          bottom: '0',
          left: '50%',
          '--tw-translate-x': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-top': {
          top: '0',
          left: '50%',
          '--tw-translate-x': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-left': {
          top: '50%',
          left: '0',
          '--tw-translate-y': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-right': {
          top: '50%',
          right: '0',
          '--tw-translate-y': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-horizontal': {
          left: '50%',
          '--tw-translate-x': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
      });
    }),
    require('tailwindcss-motion'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;

export default config;
