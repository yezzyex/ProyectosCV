import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { jsPDF } from "jspdf";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
