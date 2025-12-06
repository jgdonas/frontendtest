import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import versionManifest from '@jose.donas/vite-plugin-version-manifest' // Using our own npm package
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), vueDevTools(), versionManifest({ verbose: true }), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 1. Listen on all IP addresses (0.0.0.0), not just localhost
    host: true,
    // 2. Strict port ensuring Docker mapping matches
    port: 5173,
    // 3. Force polling for file changes when running from Docker container
    watch: {
      usePolling: true,
    },
  },
})
