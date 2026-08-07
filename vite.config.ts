import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project Pages sites are served from /<repo>/, so every asset URL needs the
// repository name as its base path. Change this if the repo is ever renamed —
// a mismatch here ships a page whose assets all 404.
const REPO = 'portfolio2'
export const BASE_PATH = `/${REPO}/`

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), tailwindcss()],
  resolve: {
    // Mirrors the `@/*` path mapping declared in tsconfig.app.json.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Split the vendor chunk so the app shell can be cached independently of
    // React and the animation runtime, which change far less often.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
