import { ParallelComputingTechnology } from "@/shared/types/parallel-computing-technology";
import { z } from "zod";

export const RigInformation = z.object({
  pciBusId: z.number({invalid_type_error: 'PciBusId must be a number'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  memory: z.string({invalid_type_error: 'Vram must be a string'}),
  driverVersion: z.string({invalid_type_error: 'DrivetVersion must be a string'}),
  parallelComputingTechnology: ParallelComputingTechnology
})
export type RigInformation = z.infer<typeof RigInformation>

export const RigParameters = z.object({
  coreClock: z.string({invalid_type_error: 'CoreClock must be a string'}),
  coreClockOffset: z.string({invalid_type_error: 'CoreClockOffset must be a string'}),
  memoryClock: z.string({invalid_type_error: 'MemoryClock must be a string'}),
  memoryClockOffset: z.string({invalid_type_error: 'MemoryClockOffset must be a string'}),
  voltage: z.string({invalid_type_error: 'Voltage must be a string'}),
  voltageOffset: z.string({invalid_type_error: 'VoltageOffset must be a string'}),
})
export type RigParameters = z.infer<typeof RigParameters>

export const RigOverclocking = z.object({
  coreClock: z.string({invalid_type_error: 'CoreClock must be a string'}),
  coreClockOffset: z.string({invalid_type_error: 'CoreClockOffset must be a string'}),
  memoryClock: z.string({invalid_type_error: 'MemoryClock must be a string'}),
  memoryClockOffset: z.string({invalid_type_error: 'MemoryClockOffset must be a string'}),
  voltage: z.string({invalid_type_error: 'Voltage must be a string'}),
  voltageOffset: z.string({invalid_type_error: 'VoltageOffset must be a string'}),
})

export const RigGpuInfo = z.object({
  index: z.number({invalid_type_error: 'Index must be a number'}),
  bus: z.string({invalid_type_error: 'Bus must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  information: RigInformation,
  parameters: RigParameters,
  overclocking: RigOverclocking
})
export type RigGpuInfo = z.infer<typeof RigGpuInfo>