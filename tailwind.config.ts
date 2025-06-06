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
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
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
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				task: {
					urgent_important: '#F54748',
					urgent_not_important: '#38B000',
					not_urgent_important: '#FFBE0B',
					not_urgent_not_important: '#8338EC',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'escape': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(-500px) scale(0)'
					}
				},
				'shake': {
					'0%, 100%': {
						transform: 'translateX(0)'
					},
					'10%, 30%, 50%, 70%, 90%': {
						transform: 'translateX(-4px)'
					},
					'20%, 40%, 60%, 80%': {
						transform: 'translateX(4px)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'60%': { transform: 'scale(1.2)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)'
					},
					'50%': { 
						boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.9)'
					}
				},
				'rotate-bounce': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'20%': { transform: 'rotate(10deg) scale(1.1)' },
					'40%': { transform: 'rotate(-10deg) scale(1.1)' },
					'60%': { transform: 'rotate(10deg) scale(1.1)' },
					'80%': { transform: 'rotate(-10deg) scale(1.1)' },
					'100%': { transform: 'rotate(0deg) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce': 'bounce 1s ease-in-out infinite',
				'escape': 'escape 1s forwards',
				'shake': 'shake 0.5s ease-in-out',
				'float': 'float 2s ease-in-out infinite',
				'spin': 'spin 2s linear infinite',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'rotate-bounce': 'rotate-bounce 1s ease-in-out'
			},
			backgroundImage: {
				'prison-wall': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMzMzM3NDUiLz48cmVjdCB4PSI0MCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiIGZpbGw9IiMyMjI2MkYiLz48cmVjdCB5PSI0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjMiIGZpbGw9IiMyMjI2MkYiLz48L3N2Zz4=')",
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'grid-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzc0NSIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
				'brawl-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
				'brawl-stars-bg': "linear-gradient(135deg, #1e1a51 0%, #29235f 50%, #352c70 100%)",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
