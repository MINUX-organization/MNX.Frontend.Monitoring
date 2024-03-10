/// <reference types="vite/client" />

export interface ImportMetaEnv {
  VITE_FRONTEND_PORT: number;
  VITE_BACKEND_PORT: number
  VITE_BACKEND_DNS: 'string'
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}