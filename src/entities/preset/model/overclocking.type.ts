import { z } from "zod"

const DeviceType = z.enum(['CPU', 'AmdGPU', 'NvidiaGPU', 'IntelGPU'])

export const AmdOverclockingGpuSchema = z.object({
  $type: DeviceType,
  powerLimit: z.number({invalid_type_error: 'Power limit must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'Fan speed must be a number'}),
  coreClockLock: z.number({invalid_type_error: 'Core clock lock must be a number'}),
  coreClockState: z.number({invalid_type_error: 'Core clock state must be a number'}),
  memoryClockLock: z.number({invalid_type_error: 'Memory clock lock must be a number'}),
  memoryClockState: z.number({invalid_type_error: 'Memory clock state must be a number'}),
  coreVoltage: z.number({invalid_type_error: 'Core voltage lock must be a number'}),
  coreVoltageOffset: z.number({invalid_type_error: 'Core voltage offset must be a number'}),
  memoryVoltage: z.number({invalid_type_error: 'Memory voltage lock must be a number'}),
  memoryControllerVoltage: z.number({invalid_type_error: 'Memory controller voltage lock must be a number'}),
  memoryTweak: z.string({invalid_type_error: 'Memory tweak must be a string'}),
  enhancedOverclock: z.boolean({invalid_type_error: 'Enhanced overclock must be a boolean'}),
  alternativeDownVoltage: z.boolean({invalid_type_error: 'Alternative down voltage must be a boolean'}),
  socFrequency: z.number({invalid_type_error: 'SOC frequency must be a number'}),
  socVoltage: z.number({invalid_type_error: 'SOC voltage must be a number'}),
})
export type AmdOverclockingGpuType = z.infer<typeof AmdOverclockingGpuSchema>

export const NvidiaOverclockingGpuSchema = z.object({
  $type: DeviceType,
  powerLimit: z.number({invalid_type_error: 'Power limit must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'Fan speed must be a number'}),
  coreClockLock: z.number({invalid_type_error: 'Core clock lock must be a number'}),
  coreClockOffset: z.number({invalid_type_error: 'Core clock offset must be a number'}),
  memoryClockLock: z.number({invalid_type_error: 'Memory clock lock must be a number'}),
  memoryClockOffset: z.number({invalid_type_error: 'Memory clock offset must be a number'}),
  coreVoltage: z.number({invalid_type_error: 'Core voltage lock must be a number'}),
  coreVoltageOffset: z.number({invalid_type_error: 'Core voltage offset must be a number'}),
  memoryVoltage: z.number({invalid_type_error: 'Memory voltage lock must be a number'}),
  memoryVoltageOffset: z.number({invalid_type_error: 'Memory voltage offset must be a number'}),
})
export type NvidiaOverclockingGpuType = z.infer<typeof NvidiaOverclockingGpuSchema>

export const OverclockingCpuSchema = z.object({
  $type: DeviceType,
  coreClockLock: z.number({invalid_type_error: 'Core clock lock must be a number'}),
  coreVoltage: z.number({invalid_type_error: 'Core voltage lock must be a number'}),
})
export type OverclockingCpuType = z.infer<typeof OverclockingCpuSchema>

export const OverclockingSchema = z.union([
  OverclockingCpuSchema, 
  AmdOverclockingGpuSchema, 
  NvidiaOverclockingGpuSchema
])
export type OverclockingType = z.infer<typeof OverclockingSchema>