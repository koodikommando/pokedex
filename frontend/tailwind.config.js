// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include paths to your React components
  ],
  theme: {
    extend: {
      boxShadow: {
        'brutalism-sm': '2px 4px 0px 0px #1c1d21',
        'brutalism-lg': '3px 6px 0px 0px #1c1d21',
        inset: 'inset 4px 4px 6px rgba(0, 0, 0, 0.2)',
        insetDeep: 'inset 8px 8px 10px rgba(0, 0, 0, 0.3)',

      },
      scale: {
        101: '1.01', // Add your custom scale value
      },
      fontFamily: {
        publicSans: ['Public Sans', 'sans-serif'],
      },
      colors: {
        pokered: "#c72f23",
        pokeblue: "#3B4CCA",
        pokeredpastel: "#FFB3B3",  // Pastel red
        pokebluepastel: "#A3B8FF",
        pastelbeige: "#fdf5eb",
        washedblack: "#4A4A4A", // Pastel blue
      }
    },
  },
  plugins: [],
};
