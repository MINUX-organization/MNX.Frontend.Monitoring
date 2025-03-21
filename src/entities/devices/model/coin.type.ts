import { z } from "zod"

export const CoinScheme = z.object({
  coinName: z.string({invalid_type_error: 'Coin name must be a string'}),
  hashRate: z.number({invalid_type_error: 'Hash rate must be a number'}),
  shares: z.object({
    accepted: z.number({invalid_type_error: 'Accepted must be a number'}),
    rejected: z.number({invalid_type_error: 'Rejected must be a number'}),
  })
})
export type CoinType = z.infer<typeof CoinScheme>