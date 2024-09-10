const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_MONITORING = import.meta.env.VITE_BACKEND_MONITORING;
const BACKEND_MANAGMENT = import.meta.env.VITE_BACKEND_MANAGMENT;
const BACKEND_SECURITY = import.meta.env.VITE_BACKEND_SECURITY;

export const BACKEND_BASE_URL = `http://${BACKEND_URL}`;

export const BACKEND_MONITORING_URL = `/${BACKEND_MONITORING}/api`;
export const BACKEND_MANAGMENT_URL = `/${BACKEND_MANAGMENT}/api`;
export const BACKEND_SECURITY_URL = `/${BACKEND_SECURITY}/api`;

export const BACKEND_HUBS = {
  MONITORING: `${BACKEND_MONITORING_URL}/hubs/monitoring`,
} as const

export const BACKEND_APIS = {
  LOGIN: `${BACKEND_SECURITY_URL}/auth/login/user`,
  REFRESH_ACCESS_TOKEN: `${BACKEND_MANAGMENT_URL}/auth/refreshTokens`,
  CRYPTOCURRENCY: `${BACKEND_MANAGMENT_URL}/cryptocurrencies`,
  ALHORITHM: `${BACKEND_MANAGMENT_URL}/algorithms/available`,
  POOL: `${BACKEND_MANAGMENT_URL}/pools`,
  WALLET: `${BACKEND_MANAGMENT_URL}/wallets`,
  RIGS: `${BACKEND_MANAGMENT_URL}/rigs`,
  PRESETS: `${BACKEND_MANAGMENT_URL}/presets`
}