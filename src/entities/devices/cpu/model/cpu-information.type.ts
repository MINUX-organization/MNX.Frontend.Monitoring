import { z } from "zod";

export const CpuInformationSchema = z.object({
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  coresCount: z.number({invalid_type_error: 'Cores count must be a number'}),
  threadsCount: z.number({invalid_type_error: 'Threads count must be a number'}),
  architecture: z.string({invalid_type_error: 'Architecture must be a string'}),
  cache: z.object({
    l1: z.string({invalid_type_error: 'L1 must be a string'}).optional(),
    l2: z.string({invalid_type_error: 'L2 must be a string'}).optional(),
    l3: z.string({invalid_type_error: 'L3 must be a string'}).optional(),
    l4: z.string({invalid_type_error: 'L4 must be a string'}).optional()
  }),
})