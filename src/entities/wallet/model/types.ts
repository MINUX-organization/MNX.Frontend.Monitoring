import { z } from "zod";

export const Wallets = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  address: z.string({invalid_type_error: 'Address must be a string'}),
  cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
})
export type Wallets = z.infer<typeof Wallets>