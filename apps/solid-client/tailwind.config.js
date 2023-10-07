import {
  BACKGROUND_COLORS,
  FOREGROUND_COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  HEIGHT,
  WIDTH,
} from './src/configs';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        ...BACKGROUND_COLORS,
        ...FOREGROUND_COLORS,
      },
      borderColor: {
        ...BACKGROUND_COLORS,
      },
      outlineColor: {
        ...BACKGROUND_COLORS,
      },
      fontFamily: {
        ...FONT_FAMILY,
      },
      fontSize: {
        ...FONT_SIZE,
      },
      width: {
        ...WIDTH,
      },
      minWidth: {
        ...WIDTH,
      },
      maxWidth: {
        ...WIDTH,
      },
      height: {
        ...HEIGHT,
      },
      minHeight: {
        ...HEIGHT,
      },
      maxHeight: {
        ...HEIGHT,
      },
    },
  },
  plugins: [],
};
