import { z } from "zod"

const DeviceType = z.enum(['GPU', 'CPU'])

export const OverclockingGpuSchema = z.object({
  $type: DeviceType,
  powerLimit: z.number({invalid_type_error: 'Power limit must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'Fan speed must be a number'}),
  coreClockLock: z.number({invalid_type_error: 'Core clock lock must be a number'}),
  coreClockOffset: z.number({invalid_type_error: 'Core clock offset must be a number'}),
  memoryClockLock: z.number({invalid_type_error: 'Memory clock lock must be a number'}),
  memoryClockOffset: z.number({invalid_type_error: 'Memory clock offset must be a number'}),
  coreVoltage: z.number({invalid_type_error: 'Core voltage must be a number'}),
  coreVoltageOffset: z.number({invalid_type_error: 'Core voltage offset must be a number'}),
  memoryVoltage: z.number({invalid_type_error: 'Memory voltage must be a number'}),
  memoryVoltageOffset: z.number({invalid_type_error: 'Memory voltage offset must be a number'}),
})
export type OverclockingGpuType = z.infer<typeof OverclockingGpuSchema>

export const OverclockingCpuSchema = z.object({
  $type: DeviceType,
  coreClockLock: z.number({invalid_type_error: 'Core clock lock must be a number'}),
  coreVoltage: z.number({invalid_type_error: 'Core voltage lock must be a number'}),
})
export type OverclockingCpuType = z.infer<typeof OverclockingCpuSchema>

export const OverclockingSchema = z.union([OverclockingGpuSchema, OverclockingCpuSchema])
export type OverclockingType = z.infer<typeof OverclockingSchema>