import { Restrictions } from "@/shared/types/restrictions";
import { z } from "zod";

export const GpuPci = z.object({
  id: z.number({invalid_type_error: 'Id must be a number'}),
  bus: z.string({invalid_type_error: 'Bus must be a string'}),
})
export type GpuPci = z.infer<typeof GpuPci>

export const GpuMemory = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  type: z.string({invalid_type_error: 'Type must be a string'}).optional(),
  vendor: z.string({invalid_type_error: 'Vendor must be a string'}).optional(),
}, {invalid_type_error: 'Memory must be an object'})

export const GpuTechnology = z.object({
  type: z.string({invalid_type_error: 'Type must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
}, {invalid_type_error: 'Technology must be an object'})
export type GpuTechnology = z.infer<typeof GpuTechnology>

export const GpuInformation = z.object({
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}).optional(),
  vendor: z.string({invalid_type_error: 'Vendor must be a string'}),
  biosVersion: z.string({invalid_type_error: 'BiosVersion must be a string'}).optional(),
  technology: GpuTechnology,
  memory: GpuMemory
})
export type GpuInformation = z.infer<typeof GpuInformation>

export const GpuRestrictions = z.object({
  power: Restrictions,
  fanSpeed: Restrictions,
  temperature: z.object({
    core: Restrictions,
    memory: Restrictions
  }, {invalid_type_error: 'Temperature must be an object'}),
  voltage: z.object({
    core: z.object({
      lock: Restrictions,
      offset: Restrictions
    }, {invalid_type_error: 'Voltage must be an object'}),
    memory: z.object({
      lock: Restrictions,
      offset: Restrictions
    }, {invalid_type_error: 'Voltage must be an object'})
  }),
  clock: z.object({
    core: z.object({
      lock: Restrictions,
      offset: Restrictions
    }, {invalid_type_error: 'Clock must be an object'}),
    memory: z.object({
      lock: Restrictions,
      offset: Restrictions
    }, {invalid_type_error: 'Clock must be an object'})
  })
})

export const RigGpuInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
  pci: GpuPci,
  information: GpuInformation,
  restrictions: GpuRestrictions,
})
export type RigGpuInfo = z.infer<typeof RigGpuInfo>