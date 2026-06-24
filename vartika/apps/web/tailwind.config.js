/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF8",
        bg2: "#F4F1EB",
        bg3: "#EAE5DC",
        ink: "#181816",
        ink2: "#3C3C38",
        ink3: "#808078",
        ink4: "#B0AFA8",
        accent: "#3D5948",
        accent2: "#5A7D68",
        accent3: "#C8D9C8",
        warm: "#B8956A",
        warm2: "#F5EDE2",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        full: "999px",
      },
      boxShadow: {
        sm: "0 2px 12px rgba(24, 24, 22, 0.07)",
        md: "0 8px 32px rgba(24, 24, 22, 0.1)",
        lg: "0 20px 60px rgba(24, 24, 22, 0.12)",
        xl: "0 40px 100px rgba(24, 24, 22, 0.14)",
      },
    },
  },
  plugins: [],
};
