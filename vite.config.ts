import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-effect': ['effect']
        },
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'js/[hash].js',
        entryFileNames: 'js/[hash].js'
      }
    }
  },
  server: {
    port: 5173
  }
})
