import { z } from "zod";

export const ParallelComputingTechnology = z.object({
  name: z.enum(['CUDA', 'OpenCL']),
  version: z.string({invalid_type_error: 'Version must be a string'})
})
export type ParallelComputingTechnology = z.infer<typeof ParallelComputingTechnology>