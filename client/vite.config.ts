import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://ac3c-222-247-146-28.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
