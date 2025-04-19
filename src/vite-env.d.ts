/// <reference types="vite/client" />

export interface ImportMetaEnv {
  VITE_FRONTEND_PORT: 'string';
  VITE_BACKEND_URL: 'string';
  VITE_BACKEND_SECURITY: 'string';
  VITE_BACKEND_MONITORING: 'string';
  VITE_TEST_MODE: boolean;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}