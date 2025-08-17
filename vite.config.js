import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your backend during development
      '/api': {
        target: 'https://your-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist', // Explicitly set build output directory
    emptyOutDir: true, // Clear the directory before building
  },
  base: '/', // Critical for static asset paths on Render
});