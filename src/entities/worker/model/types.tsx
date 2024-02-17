import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const WorkerId = z.string({invalid_type_error: 'Id must be a string'});
export type WorkerId = z.infer<typeof WorkerId>;

export const WorkerName = z.string({invalid_type_error: 'WorkerName must be a string'});
export type WorkerName = z.infer<typeof WorkerName>;

export const WorkerGpusState = z.enum(['active', 'inactive', 'error', 'empty']).array();
export type WorkerGpusState = z.infer<typeof WorkerGpusState>;

export const WorkerIndex = z.number({invalid_type_error: 'Index must be a number'});
export type WorkerIndex = z.infer<typeof WorkerIndex>;

export const WorkerIsActive = z.boolean({invalid_type_error: 'WorkerIsActive must be a number'});
export type WorkerIsActive = z.infer<typeof WorkerIsActive>;

export const WorkerShares = z.object({
  accepted: z.number({ invalid_type_error: 'Accepted must be a number'}),
  rejected: z.number({ invalid_type_error: 'Rejected must be a number'}) 
}) 
export type WorkerShares = z.infer<typeof WorkerShares>

export const WorkerOnlineState = z.enum(['0', '1', '2', '3', '4'])
export type WorkerOnlineState = z.infer<typeof WorkerOnlineState>

export const WorkerInternetSpeed = MeasureUnit
export type WorkerInternetSpeed = z.infer<typeof WorkerInternetSpeed>

export const WorkerAverageTemperature = z.number({invalid_type_error: 'AverageTemp must be a number'});
export type WorkerAverageTemperature = z.infer<typeof WorkerAverageTemperature>;

export const WorkerPower = MeasureUnit
export type WorkerPower = z.infer<typeof WorkerPower>

export const WorkerFlightSheetInfo = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  flightSheet: z.string({invalid_type_error: 'FlightSheet must be a string'}),
  miner: z.string({invalid_type_error: 'Miner must be a string'}),
  hashrate: MeasureUnit,
  shares: WorkerShares
})
export type WorkerFlightSheetInfo = z.infer<typeof WorkerFlightSheetInfo>

export const WorkerLocalIp = z.string({invalid_type_error: 'WorkerLocalIp must be a string'});
export type WorkerLocalIp = z.infer<typeof WorkerLocalIp>;

export const WorkerMinuxVersion = z.string({invalid_type_error: 'WorkerMinuxVersion must be a string'});
export type WorkerMinuxVersion = z.infer<typeof WorkerMinuxVersion>;

export const WorkerNvidiaCount = z.number({invalid_type_error: 'WorkerNvidiaCount must be a number'});
export type WorkerNvidiaCount = z.infer<typeof WorkerNvidiaCount>;

export const WorkerAmdCount = z.number({invalid_type_error: 'WorkerAmdCount must be a number'});  
export type WorkerAmdCount = z.infer<typeof WorkerAmdCount>;

export const WorkerIntelCount = z.number({invalid_type_error: 'WorkerIntelCount must be a number'});
export type WorkerIntelCount = z.infer<typeof WorkerIntelCount>;

export const Worker = z.object({
  id: WorkerId,
  name: WorkerName.optional(),
  index: z.number({invalid_type_error: 'Index must be a number'}).optional(),
  gpusState: WorkerGpusState.optional(),
  isActive: WorkerIsActive.optional(),
  onlineState: WorkerOnlineState.optional(),
  internetSpeed: WorkerInternetSpeed.optional(),
  averageTemperature: WorkerAverageTemperature.optional(),
  fanSpeed: z.number({invalid_type_error: 'Fan must be a string'}).optional(),
  power: WorkerPower.optional(),
  flightSheetInfo: WorkerFlightSheetInfo.array().optional(),
  miningUpTime: z.string({invalid_type_error: 'MiningUpTime must be a string'}).optional(),
  bootedUpTime: z.string({invalid_type_error: 'BootedUpTime must be a string'}).optional(),
  localIp: WorkerLocalIp.optional(),
  minuxVersion: WorkerMinuxVersion.optional(),
  nvidiaCount: WorkerNvidiaCount.optional(),
  amdCount: WorkerAmdCount.optional(),
  intelCount: WorkerIntelCount.optional()
}).nullable();
export type Worker = z.infer<typeof Worker>

export type WorkerInfo = {
  miningUpTime: string;
  bootedUpTime: string;
  localIp: string;
  minuxVersion: string;
  nvidiaCount: number;
  amdCount: number;
  intelCount: number;
}