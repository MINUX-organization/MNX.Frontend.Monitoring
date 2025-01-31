import { MicrochipIcon } from "@/shared/assets/svg/microchip";
import { RootLayoutNavLink } from "../root-layout-nav-link.type";
import { MonitoringIcon } from "@/shared/assets/svg/monitoring";
import { SetupIcon } from "@/shared/assets/svg/setup";

export const NAV_FIELDS: RootLayoutNavLink[] = [
  { label: "Monitoring", to: "/monitoring", icon: <MonitoringIcon /> },
  { label: "Devices", to: "/devices", icon: <MicrochipIcon />, children: [
    { label: "GPUs", to: "/gpus" },
    { label: "CPUs", to: "/cpus" },
  ]},
  { label: "Mining", to: "/mining", children: [
    { label: "Cryptocurrencies", to: "/rigs" },
    { label: "Wallets", to: "/software" },
    { label: "Pools", to: "/pools" },
    { label: "Miners", to: "/miners" },
    { label: "Algorithms", to: "/Algorithms" },
  ]},
  { label: "Setup", to: "/setup", icon: <SetupIcon />, children: [
    { label: "Presets", to: "/presets" },
    { label: "Flight Sheets", to: "/flight-sheets" },
  ]},
]