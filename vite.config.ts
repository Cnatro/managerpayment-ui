import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target:
          'https://script.google.com/macros/s/AKfycbySH-tJnc9ntyvU7wgbE5ZgmN6Xam26GFnomo18AOmFd2UQc0XnaLoogLaGYV8GwVoT',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '/exec')
      }
    }
  }
})