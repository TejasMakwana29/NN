import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    ...(process.env.NODE_ENV === 'development' ? [inspectAttr()] : []),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // Increases the warning limit to 1500kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          // This splits all your third-party packages into a separate 'vendor' file
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});