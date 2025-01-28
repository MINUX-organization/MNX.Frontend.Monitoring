import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    },
    server: {
      port: env.VITE_FRONTEND_PORT ? Number.parseInt(env.VITE_FRONTEND_PORT) : 3000
    }
  });
}
