import { CpuIcon, GpuIcon, MiningIcon, SetupIcon, MicrochipIcon, MonitoringIcon, CoinIcon, WalletIcon, PoolIcon, AlgorithmIcon, PresetIcon, FlightSheetIcon, MinerIcon, HiveIcon } from "@/shared/assets/svg";
import { RootLayoutNavLink } from "../root-layout-nav-link.type";

export const NAV_FIELDS: RootLayoutNavLink[] = [
  { label: "Monitoring", to: "/monitoring", icon: <MonitoringIcon /> },
  { label: "Rigs", to: "/rigs", icon: <HiveIcon /> },
  { label: "Devices", to: "/devices", icon: <MicrochipIcon />, children: [
    { label: "GPUs", to: "/gpus", icon: <GpuIcon /> },
    { label: "CPUs", to: "/cpus", icon: <CpuIcon /> },
  ]},
  { label: "Mining", to: "/mining", icon: <MiningIcon />, children: [
    { label: "Cryptocurrencies", to: "/cryptocurrencies", icon: <CoinIcon /> },
    { label: "Wallets", to: "/wallets", icon: <WalletIcon /> },
    { label: "Pools", to: "/pools", icon: <PoolIcon /> },
    { label: "Miners", to: "/miners", icon: <MinerIcon /> },
    { label: "Algorithms", to: "/algorithms", icon: <AlgorithmIcon /> },
  ]},
  { label: "Setup", to: "/setup", icon: <SetupIcon />, children: [
    { label: "Presets", to: "/presets", icon: <PresetIcon /> },
    { label: "Flight Sheets", to: "/flight-sheets", icon: <FlightSheetIcon /> },
  ]},
]