/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "custom-pattern": "url('src/assets/backgroundcover.png')",
      },
      opacity: {
        20: "0.2",
      },
      colors: {
        // Indigo
        brand: {
          // {Recommended to use: discussion}
          // 50: "#e1f5fe",   // Very light blue
          // 100: "#b3e5fc",   // Light blue
          // 200: "#81d4fa",   // Soft blue
          // 300: "#4fc3f7",   // Mid blue
          // 400: "#29b6f6",   // Vibrant blue
          // 500: "#03a9f4",   // Base light blue (Primary Color)
          // 600: "#039be5",   // Darker light blue
          // 700: "#0288d1",   // Deep blue
          // 800: "#0277bd",   // Dark blue
          // 900: "#01579b"    // Very dark blue

          50: "#eef2ff",
          100: "#e0e7ff",
          300: "#a5b4fc",
          200: "#c7d2fe",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },

        beige: {
          300: "#F5F5DC"
        },
        // Grey
        grey: {
          0: "#fff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Other colors
        blue: {
          100: "#e0f2fe",
          700: "#0369a1",
        },
        green: {
          100: "#dcfce7",
          500: "#81C784",
          700: "#15803d",
        },
        yellow: {
          100: "#fef9c3",
          500: "#FFD700",
          700: "#a16207",
        },
        silver: {
          100: "#e5e7eb",
          700: "#374151",
        },
        indigo: {
          100: "#e0e7ff",
          700: "#4338ca",
        },
        red: {
          100: "#fee2e2",
          500: "#D32F2F",
          700: "#b91c1c",
          800: "#991b1b",

        },
      },
      // Add box shadows
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)",
        lg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)",
      },
      // Add border radii
      borderRadius: {
        "tiny": "3px",
        "sm": "5px",
        "md": "7px",
        "lg": "9px",
        "xl": "12px",
        "2xl": "15px",
        "3xl": "18px",
        "4xl": "20px",
      },
    },
  },
  plugins: [],
  darkMode: "class", // Add if you want to support dark mode
};
