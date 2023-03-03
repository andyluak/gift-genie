/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary) / <alpha-value>)",
          100: "hsl(var(--color-secondary-100) / <alpha-value>)",
          200: "hsl(var(--color-secondary-200) / <alpha-value>)",
          300: "hsl(var(--color-secondary-300) / <alpha-value>)",
          400: "hsl(var(--color-secondary-400) / <alpha-value>)",
          500: "hsl(var(--color-secondary-500) / <alpha-value>)",
          600: "hsl(var(--color-secondary-600) / <alpha-value>)",
          700: "hsl(var(--color-secondary-700) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
          100: "hsl(var(--color-accent-100) / <alpha-value>)",
          200: "hsl(var(--color-accent-200) / <alpha-value>)",
          300: "hsl(var(--color-accent-300) / <alpha-value>)",
          400: "hsl(var(--color-accent-400) / <alpha-value>)",
          500: "hsl(var(--color-accent-500) / <alpha-value>)",
          600: "hsl(var(--color-accent-600) / <alpha-value>)",
          700: "hsl(var(--color-accent-700) / <alpha-value>)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // @ts-ignore
    require("tailwindcss-animate"),
  ],
};
