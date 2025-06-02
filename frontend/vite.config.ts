import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//npm install --save-dev @vitejs/plugin-react

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
