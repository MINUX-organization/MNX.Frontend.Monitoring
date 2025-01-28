const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_MONITORING = import.meta.env.VITE_BACKEND_MONITORING;
const BACKEND_SECURITY = import.meta.env.VITE_BACKEND_SECURITY;

export const BACKEND_BASE_URL = BACKEND_URL;
export const BACKEND_MONITORING_URL = `/${BACKEND_MONITORING}/api`;
export const BACKEND_SECURITY_URL = `/${BACKEND_SECURITY}/api`;

export const BACKEND_HUBS = {
  MONITORING: `${BACKEND_URL}/${BACKEND_MONITORING}/hubs/monitoring`,
} as const

export const BACKEND_APIS = {
  AUTH: {
    LOGIN: `${BACKEND_SECURITY_URL}/auth/user/login`,
    SIGNUP: `${BACKEND_SECURITY_URL}/auth/user/registration`,
    REFRESH_TOKENS: `${BACKEND_SECURITY_URL}/auth/user/refreshTokens`,
    LOGOUT: `${BACKEND_SECURITY_URL}/auth/user/invalidateRefreshToken`,
    CHANGE_PASSWORD: `${BACKEND_SECURITY_URL}/user/changePassword`,
  },
  RIG: {
    RIGS: `${BACKEND_MONITORING_URL}/rigs`,
    RIG_CPUS: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/cpus`,
    RIG_GPUS: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/gpus`,
    RIG_DRIVES: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/drives`,
    RIG_MOTHERBOARD: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/motherboard`,
    RIG_NETWORK_ADAPTERS: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/network_adapters`,
    RIG_SOFTWARE: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/software`,
    RIG_POWER_OFF: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/power_off`,
    RIG_REBOOT: (rigId: string) => `${BACKEND_MONITORING_URL}/rigs/${rigId}/reboot`,
  },
  DEVICES: {
    GPUS: `${BACKEND_MONITORING_URL}/devices/gpus`,
    CPUS: `${BACKEND_MONITORING_URL}/devices/cpus`,
    GPUS_RESTRICTIONS: (gpuName: string) => `${BACKEND_MONITORING_URL}/devices/gpus/${gpuName}/restrictions`,
    GPUS_UNIQUE_NAMES: `${BACKEND_MONITORING_URL}/devices/gpus/unique_names`,
    DEVICE_OVERCLOCKING: `${BACKEND_MONITORING_URL}/devices/overclocking`,
  },
  FLIGHT_SHEET: {
    FLIGHT_SHEETS: `${BACKEND_MONITORING_URL}/flight_sheets`,
    FLIGHT_SHEETS_DEVICES: (id: string) => `${BACKEND_MONITORING_URL}/flight_sheets/${id}/devices`,
    FLIGHT_SHEETS_DEVICES_SUPPORT: (id: string) => `${BACKEND_MONITORING_URL}/flight_sheets/${id}/devices/support`,
  },
  CRYPTOCURRENCIES: `${BACKEND_MONITORING_URL}/cryptocurrencies`,
  ALHORITHMS: `${BACKEND_MONITORING_URL}/algorithms/available`,
  POOLS: `${BACKEND_MONITORING_URL}/pools`,
  WALLETS: `${BACKEND_MONITORING_URL}/wallets`,
  MINERS: `${BACKEND_MONITORING_URL}/miners/available`,
  PRESETS: `${BACKEND_MONITORING_URL}/presets`,
  PROFILE: `${BACKEND_SECURITY_URL}/profile`,
  NICKNAME : `${BACKEND_SECURITY_URL}/profile/nickname`,
} as const