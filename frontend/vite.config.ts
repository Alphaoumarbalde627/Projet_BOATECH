import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/build/',
  plugins: [react()],
  server: {
    cors: true,
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  build: {
    outDir: '../public/build',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'app.js',
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css') ? 'app.css' : 'assets/[name][extname]',
      },
    },
  },
})
