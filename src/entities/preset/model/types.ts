import { z } from "zod";

export const Overclocking = z.object({
  memoryVendor: z.string({invalid_type_error: 'MemoryVendor must be a string'}),
  memoryType: z.string({invalid_type_error: 'MemoryType must be a string'}),
  powerLimit: z.number({invalid_type_error: 'PowerLimit must be a number'}).positive({message: 'PowerLimit must be positive'}),
  fanSpeed: z.number({invalid_type_error: 'FanSpeed must be a number'}),
  memoryClockLock: z.number({invalid_type_error: 'MemoryClockLock must be a number'}).positive({message: 'MemoryClockLock must be positive'}),
  memoryClockOffset: z.number({invalid_type_error: 'MemoryClockOffset must be a number'}).positive({message: 'MemoryClockOffset must be positive'}),
  memoryVoltage: z.number({invalid_type_error: 'MemoryVoltage must be a number'}).positive({message: 'MemoryVoltage must be positive'}),
  memoryVoltageOffset: z.number({invalid_type_error: 'MemoryVoltageOffset must be a number'}).positive({message: 'MemoryVoltageOffset must be positive'}),
  coreClockLock: z.number({invalid_type_error: 'CoreClockLock must be a number'}).positive({message: 'CoreClockLock must be positive'}),
  coreClockOffset: z.number({invalid_type_error: 'CoreClockOffset must be a number'}).positive({message: 'CoreClockOffset must be positive'}),
  coreVoltage: z.number({invalid_type_error: 'CoreVoltage must be a number'}).positive({message: 'CoreVoltage must be positive'}),
  coreVoltageOffset: z.number({invalid_type_error: 'CoreVoltageOffset must be a number'}).positive({message: 'CoreVoltageOffset must be positive'}),
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
  presetsList: z.array(Preset)
})
export type PresetGroupedList = z.infer<typeof PresetGroupedList>

export const PostPresetOverclocking = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  gpuName: z.string({invalid_type_error: 'GpuName must be a string'}),
  overclocking: Overclocking.omit({memoryVendor: true, memoryType: true})
})
export type PostPresetOverclocking = Omit<z.infer<typeof PostPresetOverclocking>, 'id'>