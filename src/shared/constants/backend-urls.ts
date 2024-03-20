const BACKEND_DNS = import.meta.env.VITE_BACKEND_DNS;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
export const BACKEND_URL = `http://${BACKEND_DNS}:${BACKEND_PORT}`;

export const BACKEND_HUBS = {
  MONITORING: `${BACKEND_URL}/hubs/monitoring`,
} as const

export const BACKEND_APIS = {
  CRYPTOCURRENCY: '/cryptocurrencies',
  ALHORITHM: '/algorithms/available',
  POOL: '/pools',
  WALLET: '/wallets',
}