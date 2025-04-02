import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: "https://374c-222-247-18-224.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      "@server": path.resolve(__dirname, "../server"),
      "@src": path.resolve(__dirname, "./src"),
      "@schema": path.resolve(__dirname, "../api-schema"),
    }
  }
})
