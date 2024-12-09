const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_MONITORING = import.meta.env.VITE_BACKEND_MONITORING;
const BACKEND_SECURITY = import.meta.env.VITE_BACKEND_SECURITY;

export const BACKEND_BASE_URL = BACKEND_URL;
export const BACKEND_MONITORING_URL = `/${BACKEND_MONITORING}/api`;
export const BACKEND_SECURITY_URL = `/${BACKEND_SECURITY}/api`;

export const BACKEND_HUBS = {
  MONITORING: `${BACKEND_BASE_URL}/hubs/monitoring`,
} as const

export const BACKEND_APIS = {
  LOGIN: `${BACKEND_SECURITY_URL}/auth/login/user`,
  SIGNUP: `${BACKEND_SECURITY_URL}/auth/registration`,
  REFRESH_ACCESS_TOKEN: `${BACKEND_SECURITY_URL}/auth/refreshTokens`,
  CRYPTOCURRENCY: `${BACKEND_MONITORING_URL}/cryptocurrencies`,
  ALHORITHM: `${BACKEND_MONITORING_URL}/algorithms/available`,
  POOL: `${BACKEND_MONITORING_URL}/pools`,
  WALLET: `${BACKEND_MONITORING_URL}/wallets`,
  MINERS: `${BACKEND_MONITORING_URL}/miners/available`,
  RIGS: `${BACKEND_MONITORING_URL}/rigs`,
  PRESETS: `${BACKEND_MONITORING_URL}/presets`,
  FLIGHT_SHEETS: `${BACKEND_MONITORING_URL}/flight_sheets`,
  GPUS: `${BACKEND_MONITORING_URL}/devices/gpus`,
  GPUS_RESTRICTIONS: (gpuName: string) => `${BACKEND_MONITORING_URL}/devices/gpus/${gpuName}/restrictions`,
  GPUS_UNIQUE_NAMES: `${BACKEND_MONITORING_URL}/devices/gpus/unique_names`,
}