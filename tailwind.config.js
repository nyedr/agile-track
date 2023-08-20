/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "1hc": "675px",
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        "primary-color": "rgb(var(--primary-color))",
        "primary-color-accent": "rgb(var(--primary-color-accent))",
        "background": "rgb(var(--background))",
        "secondary-background": "rgb(var(--secondary-background))",
        "primary-text": "rgb(var(--primary-text))",
        "secondary-text": "rgb(var(--secondary-text))",
        "light-shade": "rgb(var(--light-shade))",
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
