import { CpuIcon, GpuIcon, MiningIcon, SetupIcon, MicrochipIcon, MonitoringIcon, CoinIcon, WalletIcon, PoolIcon, AlgorithmIcon, PresetIcon, FlightSheetIcon } from "@/shared/assets/svg";
import { RootLayoutNavLink } from "../root-layout-nav-link.type";

export const NAV_FIELDS: RootLayoutNavLink[] = [
  { label: "Monitoring", to: "/monitoring", icon: <MonitoringIcon /> },
  { label: "Devices", to: "/devices", icon: <MicrochipIcon />, children: [
    { label: "GPUs", to: "/gpus", icon: <GpuIcon /> },
    { label: "CPUs", to: "/cpus", icon: <CpuIcon /> },
  ]},
  { label: "Mining", to: "/mining", icon: <MiningIcon />, children: [
    { label: "Cryptocurrencies", to: "/rigs", icon: <CoinIcon /> },
    { label: "Wallets", to: "/software", icon: <WalletIcon /> },
    { label: "Pools", to: "/pools", icon: <PoolIcon /> },
    { label: "Miners", to: "/miners", icon: <MiningIcon /> },
    { label: "Algorithms", to: "/Algorithms", icon: <AlgorithmIcon /> },
  ]},
  { label: "Setup", to: "/setup", icon: <SetupIcon />, children: [
    { label: "Presets", to: "/presets", icon: <PresetIcon /> },
    { label: "Flight Sheets", to: "/flight-sheets", icon: <FlightSheetIcon /> },
  ]},
]