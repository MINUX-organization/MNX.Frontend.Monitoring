/* eslint-disable @typescript-eslint/no-explicit-any */

function getRuntimeConfig(): { backendUrl?: string; backendSecurity?: string; backendMonitoring?: string } {
  if (typeof window !== 'undefined' && (window as any).__RUNTIME_CONFIG__) {
    return (window as any).__RUNTIME_CONFIG__;
  }

  return {};
}

const runtimeConfig = getRuntimeConfig();

const BACKEND_URL = runtimeConfig.backendUrl || import.meta.env.VITE_BACKEND_URL || 'http://localhost:9999';
const BACKEND_MONITORING = runtimeConfig.backendMonitoring || import.meta.env.VITE_BACKEND_MONITORING || 'monitoring';
const BACKEND_SECURITY = runtimeConfig.backendSecurity || import.meta.env.VITE_BACKEND_SECURITY || 'security';

export const BACKEND_BASE_URL = BACKEND_URL;
export const BACKEND_MONITORING_URL = `/${BACKEND_MONITORING}/api`;
export const BACKEND_SECURITY_URL = `/${BACKEND_SECURITY}/api`;

export const BACKEND_HUBS = {
  MONITORING: `/${BACKEND_MONITORING}/hubs/monitoring`,
  NOTIFICATION: `/${BACKEND_MONITORING}/hubs/notification`,
} as const

export const BACKEND_APIS = {
  AUTH: {
    LOGIN: `${BACKEND_SECURITY_URL}/auth/user/login`,
    SIGNUP: `${BACKEND_SECURITY_URL}/auth/user/registration`,
    REFRESH_TOKENS: `${BACKEND_SECURITY_URL}/auth/user/refreshTokens`,
    LOGOUT: `${BACKEND_SECURITY_URL}/auth/user/invalidateRefreshToken`,
    CHANGE_PASSWORD: `${BACKEND_SECURITY_URL}/auth/user/changePassword`,
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
    FLIGHT_SHEET_DEVICES: (id?: string) => `${BACKEND_MONITORING_URL}/flight_sheets/${id}/devices`,
    FLIGHT_SHEET_DEVICES_SUPPORTED: (id?: string) => `${BACKEND_MONITORING_URL}/flight_sheets/${id}/devices/supported`,
  },
  PROFILE: {
    BASE: `${BACKEND_SECURITY_URL}/profile`,
    NICKNAME: `${BACKEND_SECURITY_URL}/profile/nickname`,
    GENERATE: `${BACKEND_SECURITY_URL}/profile/key/generate`
  },
  PRESET: {
    PRESETS: `${BACKEND_MONITORING_URL}/presets`,
    PRESET_DEVICES: (id?: string) => `${BACKEND_MONITORING_URL}/presets/${id}/devices`,
    PRESET_DEVICES_SUPPORTED: (id?: string) => `${BACKEND_MONITORING_URL}/presets/${id}/devices/supported`,
  },
  CRYPTOCURRENCIES: `${BACKEND_MONITORING_URL}/cryptocurrencies`,
  ALHORITHMS: {
    BASE: `${BACKEND_MONITORING_URL}/algorithms`,
    AVAILABLE: `${BACKEND_MONITORING_URL}/algorithms/available`,
  },
  POOLS: `${BACKEND_MONITORING_URL}/pools`,
  WALLETS: `${BACKEND_MONITORING_URL}/wallets`,
  MINERS: {
    AVIALABLE: `${BACKEND_MONITORING_URL}/miners/available`,
    CUSTOM_MINERS: `${BACKEND_MONITORING_URL}/miners/custom`,
  },
  NICKNAME : `${BACKEND_SECURITY_URL}/profile/nickname`,
} as const