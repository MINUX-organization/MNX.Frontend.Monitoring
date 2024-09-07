const BACKEND_DNS = import.meta.env.VITE_BACKEND_DNS;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const BACKEND_MONITORING = import.meta.env.VITE_BACKEND_MONITORING;
const BACKEND_SECURITY = import.meta.env.VITE_BACKEND_SECURITY;

export const BACKEND_MONITORING_URL = `http://${BACKEND_DNS}:${BACKEND_PORT}/${BACKEND_MONITORING}/api`;
export const BACKEND_SECURITY_URL = `http://${BACKEND_DNS}:${BACKEND_PORT}/${BACKEND_SECURITY}/api`;

export const BACKEND_HUBS = {
  MONITORING: `${BACKEND_MONITORING_URL}/hubs/monitoring`,
} as const

export const BACKEND_APIS = {
  LOGIN: '/auth/login/user',
  REFRESH_ACCESS_TOKEN: '/auth/refreshTokens',
  CRYPTOCURRENCY: '/cryptocurrencies',
  ALHORITHM: '/algorithms/available',
  POOL: '/pools',
  WALLET: '/wallets',
  RIGS: '/rigs',
  PRESETS: '/presets'
}