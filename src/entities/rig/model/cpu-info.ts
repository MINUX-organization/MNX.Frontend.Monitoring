import { z } from "zod";



export const CpuInfo = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  architecture: z.string({invalid_type_error: 'Architecture must be a string'}),
  coresCount: z.number({invalid_type_error: 'CoresCount must be a number'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  threadsCount: z.number({invalid_type_error: 'ThreadsCount must be a number'}),
  threadsPerSocketCount: z.number({invalid_type_error: 'ThreadsPerSocketCount must be a number'}),
  clocking: 
})