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
      build: {
        rollupOptions: {
          onwarn(warning, defaultHandler) {
            if (warning.code === 'INVALID_ANNOTATION') {
              return;
            }

            defaultHandler(warning);
          },

          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('microsoft/signalr')) {
                  return 'microsoft';
                }

                if (id.includes('headlessui/react')) {
                  return 'headlessui';
                }

                if (id.includes('tanstack')) {
                  return 'tanstack';
                }

                if (id.includes('chart.js')) {
                  return 'chart';
                }

                if (id.includes('react-chartjs-2')) {
                  return 'react-chart';
                }

                if (id.includes('react-signalr')) {
                  return 'react-signalr';
                }

                if (id.includes('react-query')) {
                  return 'react-query';
                }

                if (id.includes('lodash')) {
                  return 'lodash';
                }

                if (id.includes('axios')) {
                  return 'axios';
                }

                return 'vendor';
              }
            },
          }
        }
      }
    });
}