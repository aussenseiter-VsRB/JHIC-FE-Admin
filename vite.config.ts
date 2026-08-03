import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://jhicbe-4bmao1ng.b4a.run',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
