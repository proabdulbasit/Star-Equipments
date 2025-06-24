module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'marquee-20s': 'marquee 20s linear infinite',
        'marquee-7s': 'marquee 7s linear infinite',
      },
    },
  },
  plugins: [],
};
