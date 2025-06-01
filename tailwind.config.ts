import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
        display: ["var(--font-playfair)"],
        elegant: ["var(--font-crimson)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Old Money Palette
        cream: {
          50: "#fefdf8",
          100: "#fdf9e7",
          200: "#fbf2c4",
          300: "#f7e896",
          400: "#f1d960",
          500: "#e8c547",
          600: "#d4a72c",
          700: "#b08426",
          800: "#8f6a28",
          900: "#785729",
        },
        sage: {
          50: "#f6f7f4",
          100: "#e9ebe3",
          200: "#d4d8c8",
          300: "#b8c0a4",
          400: "#9ba682",
          500: "#7f8a65",
          600: "#646d4f",
          700: "#4f5640",
          800: "#424636",
          900: "#393c30",
        },
        bordeaux: {
          50: "#fdf2f2",
          100: "#fce7e7",
          200: "#f9d1d1",
          300: "#f4a8a8",
          400: "#ec7979",
          500: "#dc4444",
          600: "#c73030",
          700: "#a61e1e",
          800: "#8a1a1a",
          900: "#731a1a",
        },
        navy: {
          50: "#f0f1f7",
          100: "#e4e6f0",
          200: "#cdd1e3",
          300: "#aab2d0",
          400: "#818bb8",
          500: "#646ea3",
          600: "#52588d",
          700: "#464973",
          800: "#3d3f60",
          900: "#363751",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
      },
      backgroundImage: {
        "paper-texture":
          'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f5f5f4" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="53" cy="53" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        "linen-texture":
          'url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23e7e5e4" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="m0 40l40-40h-40v40zm40 0v-40h-40l40 40z"/%3E%3C/g%3E%3C/svg%3E\')',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
