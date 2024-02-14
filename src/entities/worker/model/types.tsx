import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const Gpus = z.enum(['active', 'inactive', 'error', 'empty']).array();
export type Gpus = z.infer<typeof Gpus>;

export const IsActive = z.boolean({invalid_type_error: 'IsActive must be a number'});
export type IsActive = z.infer<typeof IsActive>;

export const Shares = z.object({
  accepted: z.number({ invalid_type_error: 'Accepted must be a number'}),
  rejected: z.number({ invalid_type_error: 'Rejected must be a number'}) 
}) 
export type Shares = z.infer<typeof Shares>

export const OnlineSpeed = MeasureUnit
export type OnlineSpeed = z.infer<typeof OnlineSpeed>

export const Power = MeasureUnit
export type Power = z.infer<typeof Power>

export const FlightSheetInfo = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  flightSheet: z.string({invalid_type_error: 'FlightSheet must be a string'}),
  miner: z.string({invalid_type_error: 'Miner must be a string'}),
  hashrate: MeasureUnit,
  shares: Shares
}).array()
export type FlightSheetInfo = z.infer<typeof Shares>

export const UpTime = z.object({
  mining: z.string({invalid_type_error: 'Mining must be a string'}),
  booted: z.string({invalid_type_error: 'Booted must be a string'})
})
export type UpTime = z.infer<typeof UpTime>

export const TotalGpus = z.object({
  nvidia: z.number({invalid_type_error: 'Mining must be a string'}),
  amd: z.number({invalid_type_error: 'Booted must be a string'}),
  intel: z.number({invalid_type_error: 'Booted must be a string'})
})
export type TotalGpus = z.infer<typeof TotalGpus>

export const Worker = z.object({
  id: z.number({invalid_type_error: 'Id must be a number'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  gpus: Gpus, 
  isActive: IsActive,
  online: z.enum(['1', '2', '3', '4', 'ofline']),
  onlineSpeed: OnlineSpeed,
  averageTemp: z.string({invalid_type_error: 'AverageTemp must be a string'}),
  fan: z.number({invalid_type_error: 'Fan must be a string'}),
  power: Power,
  flightSheetInfo: FlightSheetInfo,
  upTime: UpTime,
  localIp: z.string({invalid_type_error: 'LocalIp must be a string'}),
  minuxVersion: z.string({invalid_type_error: 'MinuxVersion must be a string'}),
  totalGpus: TotalGpus
})
export type WorkerList = z.infer<typeof Worker>