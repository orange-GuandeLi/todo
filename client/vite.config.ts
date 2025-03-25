import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: "https://183e-222-247-141-247.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      "@server": path.resolve(__dirname, "../server"),
      "@src": path.resolve(__dirname, "./src"),
    }
  }
})
