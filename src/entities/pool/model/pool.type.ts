import { z } from "zod";

export const PoolSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  domain: z.string({invalid_type_error: 'Domain must be a string'}),
  port: z.number({invalid_type_error: 'Port must be a number'}),
  cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'}),
  cryptocurrencyId: z.string({invalid_type_error: 'Cryptocurrency id must be a string'}),
  tls: z.boolean({invalid_type_error: 'Tls must be a boolean'}),
});
export type PoolType = z.infer<typeof PoolSchema>;

export const PostPoolSchema = z.object({
  domain: z.string({ invalid_type_error: 'Domain must be a string' })
    .nonempty({ message: 'Domain is required' }),
  port: z.string({ invalid_type_error: 'Port must be a string' })
    .nonempty({ message: 'Port is required' })
    .regex(/^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, {
      message: 'Port must be a valid number between 0 and 65535 without leading zeros'
    }),
  cryptocurrencyId: z.string({ invalid_type_error: 'Cryptocurrency id must be a string' })
    .nonempty({ message: 'Cryptocurrency is required' }),
  tls: z.boolean({ invalid_type_error: 'Tls must be a boolean' }),
});
export type PostPoolType = z.infer<typeof PostPoolSchema>;