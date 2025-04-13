import { z } from "zod"

export const AlgorithmSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  userId: z.string({invalid_type_error: 'User id must be a string'}).optional(),
  name: z.string({invalid_type_error: 'Name must be a string'}),
})

export type AlgorithmType = z.infer<typeof AlgorithmSchema>

export const AlgorithmPostSchema = z.object({
  fullName: z.string({invalid_type_error: 'Full name must be a string'}).nonempty({message: 'Full name is required'}),
  bindings: z.array(z.object({
    relativeName: z.string({invalid_type_error: 'Relative name must be a string'}).nonempty({message: 'Relative name is required'}),
    minerId: z.string({invalid_type_error: 'Miner id must be a string'}).nonempty({message: 'Miner is required'})
  }))
})

export type AlgorithmPostType = z.infer<typeof AlgorithmPostSchema>