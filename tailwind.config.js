module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-950": "#0F172A",
        "gray-950": "#414B5C",
        "purple-accent": "#6366F1",
        "dark-gray": "#0C0813",
        "special-gray": "#1A1820",
        "lime-accent": "#9FC86A",
        "yellow-accent": "#FBD34D",
      },
      backgroundImage: {
        "night-pattern":
          "url('https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png?resize=800x600&vertical=center')",
        "day-pattern":
          "url('https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722376/after_noon.png?resize=800x600&vertical=center')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
