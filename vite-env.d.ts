/// <reference types="vite/client" />

export interface ImportMetaEnv {
  VITE_FRONTEND_PORT: number;
  BACKEND_URL: 'string';
  BACKEND_MONITORING_URL: 'string';
  BACKEND_MANAGEMENT_URL: 'string';
  BACKEND_SECURITY_URL: 'string';
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}