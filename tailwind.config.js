/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
      extend: {
        colors: {
          brand: {
            50:"#eefdfb",100:"#d5fbf5",200:"#adf6ea",300:"#77eada",
            400:"#3ad4c1",500:"#14b8a6",600:"#0d9488",700:"#0f766e",
            800:"#115e59",900:"#134e4a"
          }
        }
      },
    },
    plugins: [],
  };
  