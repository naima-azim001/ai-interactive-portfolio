import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ai-interactive-portfolio/',
  plugins: [react()],
  server: {
    port: 5173,
  },
})