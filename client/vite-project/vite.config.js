import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'; 



// Load .env file manually


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
     'process.env.VITE_API_BASE_URL':JSON.stringify(process.env.VITE_API_BASE_URL),
     'process.env.VITE_API_KEY':JSON.stringify(process.env.VITE_API_KEY),
  }
}) 
