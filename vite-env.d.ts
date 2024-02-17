/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FRONTEND_PORT: number;
  VITE_BACKEND_PORT: number
  VITE_BACKEND_URL: 'string'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}