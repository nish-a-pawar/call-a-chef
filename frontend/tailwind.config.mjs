import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
        callachef_theme: {
          "primary": "#FF6D28",      
          "secondary": "#F9B572",   
          "accent": "#FFE6C7",       
          "neutral": "#3E3232",      
          "base-100": "#FFF8F0",     
          "info": "#84A7A1",
          "success": "#9BCF53",
          "warning": "#FFB000",
          "error": "#EF4040",
        },
      },
      "light", 
    ],
  },
};
