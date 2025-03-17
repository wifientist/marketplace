import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log(`Running in ${mode} mode`);

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0', // Allows external access
    },
    build: {
      sourcemap: false,
    },
    preview: {
      allowedHosts: env.VITE_ALLOWED_HOSTS?.split(',') || [], // Read from env
    },
  };
});
