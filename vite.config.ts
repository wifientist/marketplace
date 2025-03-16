import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.API_BASE_URL': JSON.stringify(process.env.NODE_ENV === 'production' 
      ? 'http://localhost:4174' // Local backend URL on same server
      : '/api' // Dev proxy
    ),
  },
  server: {
    host: '0.0.0.0', // This allows external access
    proxy: {
      "/api": {
        target: process.env.API_BASE_URL || "http://localhost:5174",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    sourcemap: false,
  },
  preview: {
    allowedHosts: process.env.ALLOWED_HOSTS?.split(',') || [], // Read from env
}

});
