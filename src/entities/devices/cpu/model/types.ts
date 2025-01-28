import { z } from "zod";

export const Coin = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  minerName: z.string({invalid_type_error: 'MinerName must be a string'}),
  coins: z.array(z.object({
    coinName: z.string({invalid_type_error: 'Coin must be a string'}),
    hashRate: z.number({invalid_type_error: 'Hashrate must be a number'}),
    shares: z.object({
      accepted: z.number({invalid_type_error: 'Accepted must be a number'}),
      rejected: z.number({invalid_type_error: 'Rejected must be a number'})
    })
  }))
})
export type Coin = z.infer<typeof Coin>

export const DeviceСpuDynamic = z.object({
  deviceId: z.string({invalid_type_error: 'Id must be a string'}),
  deviceName: z.string({invalid_type_error: 'Name must be a string'}),
  miningState: z.enum(['Active', 'Inactive', 'Error'], {invalid_type_error: 'MiningState must be a string'}),
  temperature: z.number({invalid_type_error: 'Temperature must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'fan must be a number'}),
  power: z.number({invalid_type_error: 'Power must be a number'}),
  flightSheet: Coin.array(),
})
export type DeviceCpuDynamic = z.infer<typeof DeviceСpuDynamic>

export const DeviceCpuInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  miningState: z.enum(['Active', 'Inactive', 'Error'], {invalid_type_error: 'MiningState must be a string'}),
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
})
export type DeviceCpuInfo = z.infer<typeof DeviceCpuInfo>

export const DeviceCpu = DeviceCpuInfo.merge(DeviceСpuDynamic)
export type DeviceCpu = z.infer<typeof DeviceCpu>