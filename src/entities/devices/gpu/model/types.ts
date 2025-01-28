import { ParallelComputingTechnology } from "@/shared/types/parallel-computing-technology";
import { z } from "zod";

export const Pci = z.object({
  $type: z.string({invalid_type_error: 'Type must be a string'}),
  id: z.string({invalid_type_error: 'Id must be a string'}),
  bus: z.string({invalid_type_error: 'Bus must be a string'}),
})
export type Pci = z.infer<typeof Pci>

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

export const Information = z.object({
  $type: z.string({invalid_type_error: 'Type must be a string'}),
  manufacturer: z.string({invalid_type_error: 'Name must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  vendor: z.string({invalid_type_error: 'Vendor must be a string'}),
  biosVersion: z.string({invalid_type_error: 'BiosVersion must be a string'}),
  technology: ParallelComputingTechnology,
  memory: z.object({
    total: z.number({invalid_type_error: 'Total must be a number'}),
    type: z.string({invalid_type_error: 'Type must be a string'}),
    vendor: z.string({invalid_type_error: 'Vendor must be a string'})
  }),
})
export type Information = z.infer<typeof Information>

export const DeviceGpuDynamic = z.object({
  deviceId: z.string({invalid_type_error: 'Id must be a string'}),
  type: z.enum(['CPU', 'GPU'], {invalid_type_error: 'Type must be a string'}),
  deviceName: z.string({invalid_type_error: 'Name must be a string'}),
  coreTemperature: z.number({invalid_type_error: 'CoreTemperature must be a number'}),
  memoryTemperature: z.number({invalid_type_error: 'MemoryTemperature must be a number'}),
  avarageTemperature: z.number({invalid_type_error: 'AvarageTemperature must be a number'}),
  miningState: z.enum(['Active', 'Inactive', 'Error'], {invalid_type_error: 'MiningState must be a string'}),
  fanSpeed: z.number({invalid_type_error: 'Fan must be a number'}),
  power: z.number({invalid_type_error: 'Power must be a number'}),
  flightSheet: Coin.optional(),
})
export type DeviceGpuDynamic = z.infer<typeof DeviceGpuDynamic>

export const DeviceGpuInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  pci: Pci,
  information: Information,
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
  driverVersion: z.string({invalid_type_error: 'DriverVersion must be a string'}),
  flightSheetName: z.string({invalid_type_error: 'FlightSheetName must be a string'}),
  minerName: z.string({invalid_type_error: 'MinerName must be a string'}),
})
export type DeviceGpuInfo = z.infer<typeof DeviceGpuInfo>

export const DeviceGpu = DeviceGpuInfo.merge(DeviceGpuDynamic.omit({deviceId: true}))
export type DeviceGpu = z.infer<typeof DeviceGpu>

export const Restrictions = z.object({
  minimal: z.number({invalid_type_error: 'Minimal must be a number'}),
  maximal: z.number({invalid_type_error: 'Maximal must be a number'}),
  isWritable: z.boolean({invalid_type_error: 'IsWritable must be a boolean'}),
  default: z.number({invalid_type_error: 'Default must be a number'})
})
export type Restrictions = z.infer<typeof Restrictions>

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