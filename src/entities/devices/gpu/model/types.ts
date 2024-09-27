import { MeasureUnit } from "@/shared/types/measure-unit";
import { ParallelComputingTechnology } from "@/shared/types/parallel-computing-technology";
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

export const DeviceGpuDynamic = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  index: z.number({invalid_type_error: 'Index must be a number'}).optional(),
  isActive: z.boolean({invalid_type_error: 'IsActive must be a boolean'}).optional(),
  memTemperature: z.number({invalid_type_error: 'Temperature must be a number'}).optional(),
  coreTemperature: z.number({invalid_type_error: 'Temperature must be a number'}).optional(),
  fan: z.number({invalid_type_error: 'Fan must be a number'}).optional(),
  power: z.number({invalid_type_error: 'Power must be a number'}).optional(),
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
  powerLimit: z.number({invalid_type_error: 'PowerLimit must be a number'}),
  manufacture: z.string({invalid_type_error: 'Manufacture must be a string'}),
  driver: z.string({invalid_type_error: 'Driver must be a string'}),
  parallelComputingTechnology: ParallelComputingTechnology,
  vendor: z.string({invalid_type_error: 'Vendor must be a string'}),
  memorySize: MeasureUnit,
  memoryVendor: z.string({invalid_type_error: 'MemoryVendor must be a string'}),
  memoryType: z.string({invalid_type_error: 'MemoryType must be a string'}),
  biosVersion: z.string({invalid_type_error: 'BiosVersion must be a string'}),
  
})
export type DeviceGpuInfo = z.infer<typeof DeviceGpuInfo>

export const DeviceGpu = DeviceGpuInfo.merge(DeviceGpuDynamic)
export type DeviceGpu = z.infer<typeof DeviceGpu>

export const Restrictions = z.object({
  minimal: z.number({invalid_type_error: 'Minimal must be a number'}),
  maximal: z.number({invalid_type_error: 'Maximal must be a number'}),
  isWritable: z.boolean({invalid_type_error: 'IsWritable must be a boolean'}),
  default: z.number({invalid_type_error: 'Default must be a number'})
})

export const GpuRestrictions = z.object({
  power: Restrictions,
  fanSpeed: Restrictions,
  temperature: z.object({
    core: Restrictions,
    memory: Restrictions
  }),
  voltage: z.object({
    core: z.object({
      lock: Restrictions,
      offset: Restrictions
    }),
    memory: z.object({
      lock: Restrictions,
      offset: Restrictions
    })
  }),
  clock: z.object({
    core: z.object({
      lock: Restrictions,
      offset: Restrictions
    }),
    memory: z.object({
      lock: Restrictions,
      offset: Restrictions
    })
  })
})

export type GpuRestrictions = z.infer<typeof GpuRestrictions>