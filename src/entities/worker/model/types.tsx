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

export const OnlineState = z.enum(['1', '2', '3', '4', 'ofline'])
export type OnlineState = z.infer<typeof OnlineState>

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
})
export type FlightSheetInfo = z.infer<typeof FlightSheetInfo>

export const UpTime = z.object({
  mining: z.string({invalid_type_error: 'Mining must be a string'}),
  booted: z.string({invalid_type_error: 'Booted must be a string'})
})
export type UpTime = z.infer<typeof UpTime>

export const Worker = z.object({
  id: z.number({invalid_type_error: 'Id must be a number'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  gpusState: Gpus, 
  isActive: IsActive,
  onlineState: OnlineState,
  onlineSpeed: OnlineSpeed,
  averageTemperature: z.number({invalid_type_error: 'AverageTemp must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'Fan must be a string'}),
  power: Power,
  flightSheetInfo: FlightSheetInfo.array(),
  miningUpTime: z.string({invalid_type_error: 'MiningUpTime must be a string'}),
  bootedUpTime: z.string({invalid_type_error: 'BootedUpTime must be a string'}),
  localIp: z.string({invalid_type_error: 'LocalIp must be a string'}),
  minuxVersion: z.string({invalid_type_error: 'MinuxVersion must be a string'}),
  nvidiaCount: z.number({invalid_type_error: 'Mining must be a string'}),
  amdCount: z.number({invalid_type_error: 'Booted must be a string'}),
  intelCount: z.number({invalid_type_error: 'Booted must be a string'})
})
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