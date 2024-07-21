import { z } from "zod";

export const Pool = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  domain: z.string({invalid_type_error: 'Domain must be a string'}),
  port: z.number({invalid_type_error: 'Address must be a number'}),
  cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
})
export type Pool = z.infer<typeof Pool>

export const PostPool = z.object({
  domain: z.string({invalid_type_error: 'Domain must be a string'}),
  port: z.number({invalid_type_error: 'Address must be a number'}),
  cryptocurrencyId: z.string({invalid_type_error: 'CryptocurrencyId must be a string'})
})

export type PostPool = z.infer<typeof PostPool>