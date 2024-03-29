import { z } from "zod";

export const Wallet = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  address: z.string({invalid_type_error: 'Address must be a string'}),
  cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
})
export type Wallet = z.infer<typeof Wallet>

export const PostWallet = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  address: z.string({invalid_type_error: 'Address must be a string'}),
  cryptocurrencyId: z.string({invalid_type_error: 'CryptocurrencyId must be a string'})
})
export type PostWallet = z.infer<typeof PostWallet>