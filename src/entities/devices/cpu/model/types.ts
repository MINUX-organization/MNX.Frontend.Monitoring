import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const Coin = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  hashrate: MeasureUnit,
  shares: z.object({
    accepted: z.number({invalid_type_error: 'Accepted must be a number'}),
    rejected: z.number({invalid_type_error: 'Rejected must be a number'})
  }),
  performance: z.number({invalid_type_error: 'Performance must be a number'})
})
export type Coin = z.infer<typeof Coin>

export const DeviceСpuDynamic = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  index: z.number({invalid_type_error: 'Index must be a number'}).optional(),
  isActive: z.boolean({invalid_type_error: 'IsActive must be a boolean'}).optional(),
  clock: z.number({invalid_type_error: 'Clock must be a number'}).optional(),
  temperature: z.number({invalid_type_error: 'Temperature must be a number'}).optional(),
  fan: z.number({invalid_type_error: 'fan must be a number'}).optional(),
  power: z.number({invalid_type_error: 'Power must be a number'}).optional(),
  coins: Coin.array().optional()
})
export type DeviceGpuDynamic = z.infer<typeof DeviceСpuDynamic>

export const DeviceCpuInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  isActive: z.boolean({invalid_type_error: 'IsActive must be a boolean'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
  
})
export type DeviceCpuInfo = z.infer<typeof DeviceCpuInfo>

export const DeviceCpu = DeviceCpuInfo.merge(DeviceСpuDynamic)
export type DeviceCpu = z.infer<typeof DeviceCpu>