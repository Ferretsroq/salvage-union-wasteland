import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://ferretsroq.github.io/salvage-union-wasteland/",
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/salvage-union-wasteland/": "/salvage-union-wasteland/",
})
