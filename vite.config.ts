import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsconfigPaths from "vite-tsconfig-paths"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(), 
      tsconfigPaths(), 
      TanStackRouterVite({ 
        autoCodeSplitting: true,
        routesDirectory: resolve(__dirname, "./src/app/routes"),
        generatedRouteTree: resolve(__dirname, "./src/app/routeTree.gen.ts")
      })],
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    },
    server: {
      port: env.VITE_FRONTEND_PORT ? Number.parseInt(env.VITE_FRONTEND_PORT) : 3000
    }
  });
}
