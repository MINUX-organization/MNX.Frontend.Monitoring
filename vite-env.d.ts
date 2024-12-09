/// <reference types="vite/client" />

export interface ImportMetaEnv {
  VITE_FRONTEND_PORT: number;
  VITE_BACKEND_URL: 'string';
  VITE_BACKEND_MONITORING_URL: 'string';
  VITE_BACKEND_MANAGEMENT_URL: 'string';
  VITE_BACKEND_SECURITY_URL: 'string';
  VITE_TEST_MODE: boolean;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}