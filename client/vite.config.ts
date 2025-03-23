import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: "https://008d-222-247-155-79.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
