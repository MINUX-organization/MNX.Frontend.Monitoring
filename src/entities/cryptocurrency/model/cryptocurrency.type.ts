import { z } from "zod";

export const CryptocurrencySchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  shortName: z.string({invalid_type_error: 'Short name must be a string'}),
  fullName: z.string({invalid_type_error: 'Full name must be a string'}),
  algorithm: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'}),
  })
})
export type CryptocurrencyType = z.infer<typeof CryptocurrencySchema>