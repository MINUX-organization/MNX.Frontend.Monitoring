import { z } from "zod"

export const RestrictionsSchema = z.object({
  minimal: z.number({invalid_type_error: 'Minimal must be a number'}),
  maximal: z.number({invalid_type_error: 'Maximal must be a number'}),
  isWritable: z.boolean({invalid_type_error: 'IsWritable must be a boolean'}),
  default: z.number({invalid_type_error: 'Default must be a number'})
})
export type RestrictionsType = z.infer<typeof RestrictionsSchema>

export const GpuRestrictionsSchema = z.object({
  power: RestrictionsSchema,
  fanSpeed: RestrictionsSchema,
  temperatureCore: RestrictionsSchema,
  temperatureMemory: RestrictionsSchema,
  clockCoreLock: RestrictionsSchema,
  clockCoreOffset: RestrictionsSchema,
  clockMemoryLock: RestrictionsSchema,
  clockMemoryOffset: RestrictionsSchema,
  voltageCoreLock: RestrictionsSchema,
  voltageCoreOffset: RestrictionsSchema,
  voltageMemoryLock: RestrictionsSchema,
  voltageMemoryOffset: RestrictionsSchema
})
export type GpuRestrictionsType = z.infer<typeof GpuRestrictionsSchema>