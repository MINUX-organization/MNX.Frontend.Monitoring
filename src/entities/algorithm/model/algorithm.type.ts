import { z } from "zod"

export const AlgorithmSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
})

export type AlgorithmType = z.infer<typeof AlgorithmSchema>