import { z } from "zod";

export const Overclocking = z.object({
  powerLimit: z.number({invalid_type_error: 'PowerLimit must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'FanSpeed must be a number'}),
  memoryClockLock: z.number({invalid_type_error: 'MemoryClockLock must be a number'}),
  memoryClockOffset: z.number({invalid_type_error: 'MemoryClockOffset must be a number'}),
  memoryVoltage: z.number({invalid_type_error: 'MemoryVoltage must be a number'}),
  memoryVoltageOffset: z.number({invalid_type_error: 'MemoryVoltageOffset must be a number'}),
  coreClockLock: z.number({invalid_type_error: 'CoreClockLock must be a number'}),
  coreClockOffset: z.number({invalid_type_error: 'CoreClockOffset must be a number'}),
  coreVoltage: z.number({invalid_type_error: 'CoreVoltage must be a number'}),
  coreVoltageOffset: z.number({invalid_type_error: 'CoreVoltageOffset must be a number'}),
})
export type Overclocking = z.infer<typeof Overclocking>

export const Preset = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  gpuName: z.string({invalid_type_error: 'GpuName must be a string'}),
  overclocking: Overclocking
})
export type Preset = z.infer<typeof Preset>

export const PresetGroupedList = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  presets: z.array(Preset)
})
export type PresetGroupedList = z.infer<typeof PresetGroupedList>

export const PostPresetOverclocking = Preset.omit({id: true})
export type PostPresetOverclocking = z.infer<typeof PostPresetOverclocking>