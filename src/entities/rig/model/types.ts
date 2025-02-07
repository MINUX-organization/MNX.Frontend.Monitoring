import { SharesCount } from "@/entities/total";
import { CoinStatistic } from "@/entities/total/model/types";
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

export const RigCoinInfo = CoinStatistic.and(z.object({
  minerName: z.string({invalid_type_error: 'MinerName must be a string'}),
  flightSheetName: z.string({invalid_type_error: 'FlightSheetName must be a string'})
}))
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
  name: RigName,
  totalShares: SharesCount,
  totalHashRate: z.number({invalid_type_error: 'TotalHashRate must be a number'}),
  totalCoinStatistics: RigCoinInfo.array(),
  bootedUpTime: z.string({invalid_type_error: 'BootedUpTime must be a string'}),
  miningUpTime: z.string({invalid_type_error: 'MiningUpTime must be a string'}),
  totalPower: z.number({invalid_type_error: 'TotalPower must be a number'}),
  averageMiningDevicesTemperature: z.number({invalid_type_error: 'AverageMiningDevicesTemperature must be a number'}),
  averageMiningDevicesFanSpeed: z.number({invalid_type_error: 'AverageMiningDevicesFanSpeed must be a number'}),
  internetSpeed: z.number({invalid_type_error: 'InternetSpeed must be a number'}),
  onlineState: RigOnlineState,
  localIp: RigLocalIp,
  minuxVersion: RigMinuxVersion,
  countDevices: z.object({
    totalCpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'TotalCpusCount must be a number'})),
    totalGpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'TotalGpusCount must be a number'})),
  })
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

export const RigTotalCountDevices = z.object({
  totalCpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'TotalCpusCount must be a number'})),
  totalCpusCount: z.number({invalid_type_error: 'TotalCpusCount must be a number'}),
  totalGpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'TotalGpusCount must be a number'})),
  totalGpusCount: z.number({invalid_type_error: 'TotalGpusCount must be a number'}),
  totalDrivesCount: z.number({invalid_type_error: 'TotalDrivesCount must be a number'}),
})
export type RigTotalCountDevices = z.infer<typeof RigTotalCountDevices>

export const RigTotalInfo = z.object({  
  minuxVersion: z.string({invalid_type_error: 'MinuxVersion must be a string'}),
  linuxVersion: z.string({invalid_type_error: 'LinuxVersion must be a string'}),
  amdGpuDriverVersion: z.string({invalid_type_error: 'AmdDriverVersion must be a string'}),
  nvidiaGpuDriverVersion: z.string({invalid_type_error: 'NvidiaDriverVersion must be a string'}),
  intelGpuDriverVersion: z.string({invalid_type_error: 'IntelDriverVersion must be a string'}),
  openCLVersion: z.string({invalid_type_error: 'OpenCLVersion must be a string'}),
  cudaVersion: z.string({invalid_type_error: 'CudaVersion must be a string'}),
  agentVersion: z.string({invalid_type_error: 'AgentVersion must be a string'}),
  hardwareManagerVersion: z.string({invalid_type_error: 'HardwareManagerVersion must be a string'}),
  miners: z.record(z.string({invalid_type_error: 'Miner must be a string'})),
})
export type RigTotalInfo = z.infer<typeof RigTotalInfo>

export const RigFlightSheet = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  coinsList: z.array(z.string({invalid_type_error: 'Coin must be a string'})) 
})
export type RigFlightSheet = z.infer<typeof RigFlightSheet>

export const RigTotal = z.object({
  id: RigId,
  ownerId: z.string({invalid_type_error: 'OwnerId must be a string'}),
  name: RigName,
  mac: z.string({invalid_type_error: 'Mac must be a string'}),
  globalIP: z.string({invalid_type_error: 'GlobalIp must be a string'}),
  localIP: z.string({invalid_type_error: 'LocalIp must be a string'}),
  software: RigTotalInfo,
  flightSheets: RigFlightSheet.array().optional(), //fix
  countDevices: RigTotalCountDevices,
})
export type RigTotal = z.infer<typeof RigTotal>