import { z } from "zod";

const numberOrEmptyString = z.string().refine((val) => {
  if (val === '') return true;
  return !isNaN(Number(val));
}, {
  message: 'Value must be a number or an empty string',
});

export const PostCoinConfigSchema = z.object({
  poolId: z.string({invalid_type_error: 'Pool id must be a string'}).nonempty({message: 'Pool is required'}).default(''), 
  walletId: z.string({invalid_type_error: 'Wallet id must be a string'}).nonempty({message: 'Wallet is required'}).default(''),
  poolPassword: z.string({invalid_type_error: 'Pool password must be a string'}).optional()
})
export type PostCoinConfigType = z.infer<typeof PostCoinConfigSchema>

export const CoinConfigSchema = z.object({
  pool: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    domain: z.string({invalid_type_error: 'Domain must be a string'}),
    port: z.number({invalid_type_error: 'Port must be a number'}),
    cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'}),
  }),
  wallet: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'}),
    address: z.string({invalid_type_error: 'Address must be a string'}),
    cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'}),
  }),
  poolPassword: z.string({invalid_type_error: 'Pool password must be a string'}).optional(),
})
export type CoinConfigType = z.infer<typeof CoinConfigSchema>

export const FlightSheetTargetMiningConfigSchema = z.object({
  $type: z.enum(["GPU", "CPU"], {invalid_type_error: '$Type must be a string'}),
  additionalArguments: z.string({invalid_type_error: 'Additional arguments must be a string'}).optional(),
  configFileContent: z.string({invalid_type_error: 'Config file content must be a string'}).optional(),
  coinConfigs: CoinConfigSchema.array(),
  hugePages: z.union([z.number({invalid_type_error: 'Huge pages must be a number'}), numberOrEmptyString]).optional(),
  threadsCount: z.union([z.number({invalid_type_error: 'Threads count must be a number'}), numberOrEmptyString]).optional(),
})
export type FlightSheetTargetMiningConfigType = z.infer<typeof FlightSheetTargetMiningConfigSchema>

export const PostFlightSheetTargetMiningConfigSchema = z.object({
  $type: z.enum(["GPU", "CPU"], {invalid_type_error: '$Type must be a string'}),
  additionalArguments: z.string({invalid_type_error: 'Additional arguments must be a string'}).optional(),
  configFileContent: z.string({invalid_type_error: 'Config file content must be a string'}).optional(),
  coinConfigs: PostCoinConfigSchema.array(),
  hugePages: numberOrEmptyString.optional(),
  threadsCount: numberOrEmptyString.optional(),
})
export type PostFlightSheetTargetMiningConfigType = z.infer<typeof PostFlightSheetTargetMiningConfigSchema>