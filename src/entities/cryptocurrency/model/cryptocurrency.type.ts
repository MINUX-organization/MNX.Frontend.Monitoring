import { z } from "zod";

export const CryptocurrencySchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  shortName: z.string({invalid_type_error: 'Short name must be a string'}).nonempty({message: 'Short name is required'}),
  fullName: z.string({invalid_type_error: 'Full name must be a string'}).nonempty({message: 'Full name is required'}),  
  algorithm: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'}),
  })
})
export type CryptocurrencyType = z.infer<typeof CryptocurrencySchema>

export const PostCryptocurrencySchema = z.object({
  shortName: z.string({invalid_type_error: 'Short name must be a string'}).nonempty({message: 'Short name is required'}),
  fullName: z.string({invalid_type_error: 'Full name must be a string'}).nonempty({message: 'Full name is required'}),
  algorithmId: z.string({invalid_type_error: 'Algorithm id must be a string'}).nonempty({message: 'Algorithm is required'}),
})
export type PostCryptocurrencyType = z.infer<typeof PostCryptocurrencySchema>
