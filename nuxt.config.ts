import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@tresjs/nuxt',
    '@nuxt/image'
    // Optional SEO suite (sitemap, og-image, robots, schema-org).
    // To enable: `npm i -D @nuxtjs/seo` then uncomment the next line.
    // '@nuxtjs/seo'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Obinna Nnaochin — IT Specialist & Digital Consultant',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#05060A' },
        {
          name: 'description',
          content: 'Obinna Nnaochin — IT Specialist and Digital Consultant based in Lagos, Nigeria. Full-stack web development, AI prompt engineering, IT support and training.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Self-host in production; using Google Fonts CDN here for portability.
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false
      }
    ]
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  vite: {
    optimizeDeps: {
      include: ['three', 'gsap', 'lenis']
    }
  }

  // If you enable @nuxtjs/seo, add your site URL here:
  // site: { url: 'https://obinnannaochin.dev', name: 'Obinna Nnaochin' }
})
