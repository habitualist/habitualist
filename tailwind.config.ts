import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        elevated: 'var(--bg-elevated)',
        glass: 'var(--bg-glass)',
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)'
        },
        ink: {
          DEFAULT: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          dim: 'var(--text-dim)'
        },
        hairline: 'var(--border-subtle)',
        'hairline-glow': 'var(--border-glow)'
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      fontSize: {
        // Fluid display sizes
        'display-sm': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display':    ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }]
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 255, 136, 0.35)',
        'glow-sm': '0 0 20px rgba(0, 255, 136, 0.2)',
        'inner-hairline': 'inset 0 1px 0 0 rgba(255,255,255,0.04)'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  }
}
