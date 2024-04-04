import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const Coin = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  hashRate: MeasureUnit,
  shares: z.object({
    accepted: z.number({invalid_type_error: 'Accepted must be a number'}),
    rejected: z.number({invalid_type_error: 'Rejected must be a number'})
  }),
  performance: z.number({invalid_type_error: 'Performance must be a number'}).optional()
})
export type Coin = z.infer<typeof Coin>

export const DeviceGpuDynamic = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  index: z.number({invalid_type_error: 'Index must be a number'}).optional(),
  isActive: z.boolean({invalid_type_error: 'IsActive must be a boolean'}).optional(),
  temperature: z.number({invalid_type_error: 'Temperature must be a number'}).optional(),
  fanSpeed: z.number({invalid_type_error: 'FanSpeed must be a number'}).optional(),
  power: MeasureUnit.optional(),
  coins: Coin.array().optional()
})
export type DeviceGpuDynamic = z.infer<typeof DeviceGpuDynamic>

export const DeviceGpuInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  index: z.number({invalid_type_error: 'Index must be a number'}),
  bus: z.number({invalid_type_error: 'Bus must be a number'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
  flightSheet: z.string({invalid_type_error: 'FlightSheet must be a string'}),
  minerName: z.string({invalid_type_error: 'MinerName must be a string'}),
  coreClock: MeasureUnit,
  memoryClock: MeasureUnit,
  criticalTemperature: z.number({invalid_type_error: 'CriticalTemperature must be a number'}),
  powerLimit: MeasureUnit,
  manufacture: z.string({invalid_type_error: 'Manufacture must be a string'}),
  driver: z.string({invalid_type_error: 'Driver must be a string'}),
  cuda: z.string({invalid_type_error: 'Cuda must be a string'}),
  vendor: z.string({invalid_type_error: 'Vendor must be a string'}),
  memorySize: MeasureUnit,
  memoryVendor: z.string({invalid_type_error: 'MemoryVendor must be a string'}),
  memoryType: z.string({invalid_type_error: 'MemoryType must be a string'}),
  biosVersion: z.string({invalid_type_error: 'BiosVersion must be a string'}),
  
})
export type DeviceGpuInfo = z.infer<typeof DeviceGpuInfo>

export const DeviceGpu = DeviceGpuInfo.merge(DeviceGpuDynamic)
export type DeviceGpu = z.infer<typeof DeviceGpu>