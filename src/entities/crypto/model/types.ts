import { z } from "zod";

export const Wallet = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  address: z.string({invalid_type_error: 'Address must be a string'}),
  cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'}),
})

export const Pool = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  domain: z.string({invalid_type_error: 'Domain must be a string'}),
  port: z.number({invalid_type_error: 'Port must be a number'}),
})

export const Crypto = z.object({
  shortName: z.string({invalid_type_error: 'ShortName must be a string'}),
  fullName: z.string({invalid_type_error: 'FullName must be a string'}),
  algorithmName: z.string({invalid_type_error: 'AlgorithmName must be a string'}),
  wallets: Wallet.array().optional(),
  pools: Pool.array().optional(),
})
export type Crypto = z.infer<typeof Crypto>