import { z } from "zod";

export const WalletSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  address: z.string({invalid_type_error: 'Address must be a string'}),
  cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'}),
})
export type WalletType = z.infer<typeof WalletSchema>

export const PostWalletSchema = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}).nonempty({message: 'Name is required'}),
  address: z.string({invalid_type_error: 'Address must be a string'}).nonempty({message: 'Address is required'}),
  cryptocurrencyId: z.string({invalid_type_error: 'Cryptocurrency id must be a string'}).nonempty({message: 'Cryptocurrency is required'}),
})
export type PostWalletType = z.infer<typeof PostWalletSchema>