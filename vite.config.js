import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/portfolio-noelia-cabral-2025/',

  plugins: [
    vue(),
    ...(mode === 'production' ? [] : [vueDevTools()])
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router') || id.includes('vue-i18n')) {
              return 'vendor-vue'
            }
            if (id.includes('aos')) {
              return 'vendor-aos'
            }
          }
        },
      },
    },
  },
}))
