import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--color-bg-primary)",
        foreground: "var(--color-copy-primary)",
        border: "var(--color-border-on-dark)",
        input: "var(--color-border-on-dark)",
        ring: "var(--color-accent-gray-2)",
        primary: {
          DEFAULT: "var(--color-blue-200)",
          foreground: "var(--color-bg-lightest)",
        },
        secondary: {
          DEFAULT: "var(--color-bg-secondary)",
          foreground: "var(--color-copy-primary)",
        },
        muted: {
          DEFAULT: "var(--color-bg-tertiary)",
          foreground: "var(--color-copy-tertiary)",
        },
        accent: {
          DEFAULT: "var(--color-accent-gray-1)",
          foreground: "var(--color-copy-primary)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius-4)",
        md: "var(--radius-3)",
        sm: "var(--radius-2)",
      },
    },
  },
  plugins: [],
};

export default config;
