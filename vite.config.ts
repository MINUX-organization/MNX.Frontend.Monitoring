import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
// import { visualizer } from 'rollup-plugin-visualizer';
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(),
      // visualizer({
      //   filename: './dist/stats.html',
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      // }),
      // TanStackRouterVite({
      //   routesDirectory: resolve(__dirname, "./src/app/routes"),
      //   generatedRouteTree: resolve(__dirname, "./src/app/routeTree.gen.ts")
      // })
    ],
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    },
    server: {
      port: env.VITE_FRONTEND_PORT ? Number.parseInt(env.VITE_FRONTEND_PORT) : 3000
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {

              if (id.includes('@chakra-ui')) {
                return 'vendor_chakra';
              }
               if (id.includes('lodash')) {
                  return 'vendor_lodash';
              }

              return 'vendor';
           }
          }
        }
      }
    }
  });
}