import { ROUTER_PATHS } from "@/shared/constants/routes";
import { NavItem } from "./types";

export const ROUT_FIELDS: NavItem[] = [
  {label: 'Monitoring', path: ROUTER_PATHS.MONITORING},
  {label: 'Devices', 
   path: ROUTER_PATHS.DEVICES,
   children: [
    {label: 'GPUs', path: ROUTER_PATHS.GPUS},
    {label: 'CPUs', path: ROUTER_PATHS.CPUS}
  ]},
  {label: 'Rigs', path: ROUTER_PATHS.RIGS},
  {label: 'Statistic', path: ROUTER_PATHS.STATISTIC},
  {label: 'Flight Sheets', path: ROUTER_PATHS.FLIGHT_SHEETS},
  {label: 'Presets', path: ROUTER_PATHS.PRESETS},
  {label: 'Cryptos', path: ROUTER_PATHS.CRYPTOS},
  {label: 'Wallets', path: ROUTER_PATHS.WALLETS},
  {label: 'Pools', path: ROUTER_PATHS.POOLS},
] as const;