import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        sans: ["Rajdhani", "system-ui", "sans-serif"],
        heading: ["Orbitron", "system-ui", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "success-green": "hsl(var(--success-green))",
        "success-green-light": "hsl(var(--success-green-light))",
        "privacy-blue": "hsl(var(--privacy-blue))",
        "privacy-blue-light": "hsl(var(--privacy-blue-light))",
        "reflection-yellow": "hsl(var(--reflection-yellow))",
        "reflection-yellow-light": "hsl(var(--reflection-yellow-light))",
        "neon-magenta": "hsl(var(--neon-magenta))",
        "neon-orange": "hsl(var(--neon-orange))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
        "hp-damage": {
          "0%": { backgroundColor: "hsl(var(--destructive))", transform: "scale(1)" },
          "50%": { backgroundColor: "hsl(var(--destructive))", transform: "scale(1.05)" },
          "100%": { backgroundColor: "hsl(var(--primary))", transform: "scale(1)" },
        },
        "hp-heal": {
          "0%": { backgroundColor: "hsl(var(--success-green))", transform: "scale(1)" },
          "50%": { backgroundColor: "hsl(var(--success-green))", transform: "scale(1.05)" },
          "100%": { backgroundColor: "hsl(var(--destructive))", transform: "scale(1)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "glow-green": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--success-green) / 0.3), 0 0 40px hsl(var(--success-green) / 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(var(--success-green) / 0.5), 0 0 60px hsl(var(--success-green) / 0.2)" 
          },
        },
        "neon-pulse": {
          "0%, 100%": {
            opacity: "1",
            textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor"
          },
          "50%": {
            opacity: "0.8",
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor"
          }
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" }
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake": "shake 0.5s ease-in-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "hp-damage": "hp-damage 0.6s ease-in-out",
        "hp-heal": "hp-heal 0.6s ease-in-out",
        "glow-green": "glow-green 2s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
