import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const RigId = z.string({invalid_type_error: 'Id must be a string'});
export type RigId = z.infer<typeof RigId>;

export const RigName = z.string({invalid_type_error: 'RigName must be a string'});
export type RigName = z.infer<typeof RigName>;

export const RigGpusState = z.enum(['active', 'inactive', 'error', 'empty']).array();
export type RigGpusState = z.infer<typeof RigGpusState>;

export const RigIndex = z.number({invalid_type_error: 'Index must be a number'});
export type RigIndex = z.infer<typeof RigIndex>;

export const RigIsActive = z.boolean({invalid_type_error: 'RigIsActive must be a number'});
export type RigIsActive = z.infer<typeof RigIsActive>;

export const RigShares = z.object({
  accepted: z.number({ invalid_type_error: 'Accepted must be a number'}),
  rejected: z.number({ invalid_type_error: 'Rejected must be a number'}) 
}) 
export type RigShares = z.infer<typeof RigShares>

export const RigOnlineState = z.enum(['0', '1', '2', '3', '4'])
export type RigOnlineState = z.infer<typeof RigOnlineState>

export const RigInternetSpeed = MeasureUnit
export type RigInternetSpeed = z.infer<typeof RigInternetSpeed>

export const RigAverageTemperature = z.number({invalid_type_error: 'AverageTemp must be a number'});
export type RigAverageTemperature = z.infer<typeof RigAverageTemperature>;

export const RigPower = MeasureUnit
export type RigPower = z.infer<typeof RigPower>

export const RigCoinInfo = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  flightSheet: z.string({invalid_type_error: 'FlightSheet must be a string'}),
  miner: z.string({invalid_type_error: 'Miner must be a string'}),
  hashrate: MeasureUnit,
  shares: RigShares
})
export type RigCoinInfo = z.infer<typeof RigCoinInfo>

export const RigLocalIp = z.string({invalid_type_error: 'RigLocalIp must be a string'});
export type RigLocalIp = z.infer<typeof RigLocalIp>;

export const RigMinuxVersion = z.string({invalid_type_error: 'RigMinuxVersion must be a string'});
export type RigMinuxVersion = z.infer<typeof RigMinuxVersion>;

export const RigNvidiaCount = z.number({invalid_type_error: 'RigNvidiaCount must be a number'});
export type RigNvidiaCount = z.infer<typeof RigNvidiaCount>;

export const RigAmdCount = z.number({invalid_type_error: 'RigAmdCount must be a number'});  
export type RigAmdCount = z.infer<typeof RigAmdCount>;

export const RigIntelCount = z.number({invalid_type_error: 'RigIntelCount must be a number'});
export type RigIntelCount = z.infer<typeof RigIntelCount>;

export type RigInfo = {
  miningUpTime: string;
  bootedUpTime: string;
  localIp: string;
  minuxVersion: string;
  nvidiaCount: number;
  amdCount: number;
  intelCount: number;
}

export const Rig = z.object({
  id: RigId,
  name: RigName.optional(),
  index: z.number({invalid_type_error: 'Index must be a number'}).optional(),
  gpusState: RigGpusState.optional(),
  isActive: RigIsActive.optional(),
  onlineState: RigOnlineState.optional(),
  internetSpeed: RigInternetSpeed.optional(),
  averageTemperature: RigAverageTemperature.optional(),
  fan: z.number({invalid_type_error: 'Fan must be a string'}).optional(),
  power: RigPower.optional(),
  coinInfo: RigCoinInfo.array().optional(),
  miningUpTime: z.string({invalid_type_error: 'MiningUpTime must be a string'}).optional(),
  bootedUpTime: z.string({invalid_type_error: 'BootedUpTime must be a string'}).optional(),
  localIp: RigLocalIp.optional(),
  minuxVersion: RigMinuxVersion.optional(),
  nvidiaCount: RigNvidiaCount.optional(),
  amdCount: RigAmdCount.optional(),
  intelCount: RigIntelCount.optional()
}).nullable();
export type Rig = z.infer<typeof Rig>

export const RigTotalGpusCount = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  nvidia: RigNvidiaCount,
  amd: RigAmdCount,
  intel: RigIntelCount
})
export type RigTotalGpusCount = z.infer<typeof RigTotalGpusCount>

export const RigTotalCpusCount = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  amd: RigAmdCount,
  intel: RigIntelCount
})
export type RigTotalCpusCount = z.infer<typeof RigTotalCpusCount>

export const RigTotalInfo = z.object({
  amdVer: z.string({invalid_type_error: 'AmdVer must be a string'}),
  nvidiaVer: z.string({invalid_type_error: 'NvidiaVer must be a string'}),
  openClVer: z.string({invalid_type_error: 'OpenClVer must be a string'}),
  cudaVer: z.string({invalid_type_error: 'CudaVer must be a string'}),
  linuxVer: z.string({invalid_type_error: 'LinuxVer must be a string'}),
  minuxVer: z.string({invalid_type_error: 'MinuxVer must be a string'}),
  mac: z.string({invalid_type_error: 'Mac must be a string'}),
  globalIp: z.string({invalid_type_error: 'GlobalIp must be a string'}),
  localIp: z.string({invalid_type_error: 'LocalIp must be a string'}),
})
export type RigTotalInfo = z.infer<typeof RigTotalInfo>

export const RigFlightSheet = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  coinsList: z.array(z.string({invalid_type_error: 'Coin must be a string'})) 
})
export type RigFlightSheet = z.infer<typeof RigFlightSheet>

export const RigTotal = z.object({
  id: RigId,
  name: RigName,
  index: z.number({invalid_type_error: 'Index must be a number'}),
  isActive: RigIsActive,
  onlineState: RigOnlineState,
  gpusCount: RigTotalGpusCount,
  cpusCount: RigTotalCpusCount,
  hddsCount: z.number({invalid_type_error: 'TotalHddsCount must be a number'}),
  power: MeasureUnit,
  info: RigTotalInfo,
  flightSheets: RigFlightSheet.array()
})
export type RigTotal = z.infer<typeof RigTotal>