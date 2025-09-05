import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))'
				},
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					blue: 'hsl(var(--neon-blue))',
					pink: 'hsl(var(--neon-pink))',
					red: 'hsl(var(--neon-red))'
				},
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))'
			},
			backgroundImage: {
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-luxury': 'var(--gradient-luxury)',
				'gradient-glow': 'var(--gradient-glow)',
				'luxury-radial': 'radial-gradient(ellipse at center, hsl(var(--background-secondary)), hsl(var(--background)))'
			},
			boxShadow: {
				'neon': 'var(--shadow-neon)',
				'luxury': 'var(--shadow-luxury)',
				'card': 'var(--shadow-card)',
				'neon-sm': '0 0 10px hsl(var(--neon-cyan) / 0.3)',
				'neon-lg': '0 0 50px hsl(var(--neon-cyan) / 0.6)'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
				'float': 'float 6s ease-in-out infinite',
				'scale-in': 'scale-in 0.3s ease-out'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'glow-pulse': {
					'0%': { boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.3)' },
					'100%': { boxShadow: '0 0 40px hsl(var(--neon-cyan) / 0.8)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			transitionTimingFunction: {
				'luxury': 'cubic-bezier(0.23, 1, 0.32, 1)',
				'neon': 'cubic-bezier(0.4, 0, 0.2, 1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
