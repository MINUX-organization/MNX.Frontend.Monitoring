const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_MONITORING = import.meta.env.VITE_BACKEND_MONITORING;
const BACKEND_MANAGEMENT = import.meta.env.VITE_BACKEND_MANAGEMENT;
const BACKEND_SECURITY = import.meta.env.VITE_BACKEND_SECURITY;

export const BACKEND_BASE_URL = BACKEND_URL;
export const BACKEND_MONITORING_URL = `/${BACKEND_MONITORING}/api`;
export const BACKEND_MANAGEMENT_URL = `/${BACKEND_MANAGEMENT}/api`;
export const BACKEND_SECURITY_URL = `/${BACKEND_SECURITY}/api`;

export const BACKEND_HUBS = {
  MONITORING: `${BACKEND_MONITORING_URL}/hubs/monitoring`,
} as const

export const BACKEND_APIS = {
  LOGIN: `${BACKEND_SECURITY_URL}/auth/login/user`,
  REFRESH_ACCESS_TOKEN: `${BACKEND_SECURITY_URL}/auth/refreshTokens`,
  CRYPTOCURRENCY: `${BACKEND_MANAGEMENT_URL}/cryptocurrencies`,
  ALHORITHM: `${BACKEND_MANAGEMENT_URL}/algorithms/available`,
  POOL: `${BACKEND_MANAGEMENT_URL}/pools`,
  WALLET: `${BACKEND_MANAGEMENT_URL}/wallets`,
  RIGS: `${BACKEND_MANAGEMENT_URL}/rigs`,
  PRESETS: `${BACKEND_MANAGEMENT_URL}/presets`,
  FLIGHT_SHEETS: `${BACKEND_MANAGEMENT_URL}/flight_sheets`,
  GPUS: `${BACKEND_MONITORING_URL}/devices/gpus`,
  GPUS_RESTRICTIONS: (gpuName: string) => `${BACKEND_MONITORING_URL}/devices/gpus/${gpuName}/restrictions`,
  GPUS_UNIQUE_NAMES: `${BACKEND_MONITORING_URL}/devices/gpus/unique_names`,
}