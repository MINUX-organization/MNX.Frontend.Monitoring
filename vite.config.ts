import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '') 
    return defineConfig({
      plugins: [react()],
      resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
      },
      server: {
        port: env.VITE_FRONTEND_PORT ? Number.parseInt(env.VITE_FRONTEND_PORT) : 3000
      },
    });
}