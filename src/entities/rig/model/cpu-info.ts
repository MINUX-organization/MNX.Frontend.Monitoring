import { z } from "zod";

export const Clocking = z.object({
  minClock: z.string({invalid_type_error: 'MinClock must be a string'}),
  maxClock: z.string({invalid_type_error: 'MaxClock must be a string'}),
  currentClock: z.string({invalid_type_error: 'CurrentClock must be a string'}),
})
export type Clocking = z.infer<typeof Clocking>

export const CpuInfo = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  architecture: z.string({invalid_type_error: 'Architecture must be a string'}),
  coresCount: z.number({invalid_type_error: 'CoresCount must be a number'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  threadsCount: z.number({invalid_type_error: 'ThreadsCount must be a number'}),
  threadsPerSocketCount: z.number({invalid_type_error: 'ThreadsPerSocketCount must be a number'}),
  clocking: Clocking
})
export type CpuInfo = z.infer<typeof CpuInfo>