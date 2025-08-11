/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
       
        primary: {
          light: "#63b7ad",   
          dark: "#2A9D68",    
        },
        secondary: { 
          light: "#188067",
          dark: "#2C6CB0",
        },
        button:{
            light: "#6ec7a4",
        },
        
        success: "#16A34A",
        warning: "#FACC15",
        error: "#DC2626",
        info: "#0EA5E9",

       
        background: {
          light: "#f6fffb",
          dark: "#E9ECEF",
        },
        text: {
          dark: "#1E293B",
          light: "#ffffff",
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
};
