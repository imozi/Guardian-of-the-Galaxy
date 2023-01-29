import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  build: {
    emptyOutDir: false,
  },
  ssr: {
    format: 'cjs',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
