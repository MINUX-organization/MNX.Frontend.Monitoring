import { elements } from "chart.js";
import { z } from "zod";

export const Algorithm = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'})
})
export type Algorithm = z.infer<typeof Algorithm>

export const Crypto = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  shortName: z.string({invalid_type_error: 'ShortName must be a string'}),
  fullName: z.string({invalid_type_error: 'FullName must be a string'}),
  algorithm: Algorithm
})
export type Crypto = z.infer<typeof Crypto>

export const RigDevice = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
  type: z.string({invalid_type_error: 'Type must be a string'}),
  flightSheetName: z.string({invalid_type_error: 'FlightheetName must be a string'}).optional(),
  flightSheetIsConfirm: z.boolean({invalid_type_error: 'FlightSheetisConfirm must be a boolean'}),
  minerName: z.string({invalid_type_error: 'MinerName must be a string'}).optional(),
  pciBus: z.string({invalid_type_error: 'PciBus must be a string'}).optional(),
})
export type RigDevice = z.infer<typeof RigDevice>

export const RigDevices = z.object({
  name: z.string({invalid_type_error: 'RigName must be a string'}),
  elements: z.object({
    name: z.string({invalid_type_error: 'Name must be a string'}),
    elements: RigDevice.array(),
  }).array(),
})
export type RigDevices = z.infer<typeof RigDevices>

export const CoinConfig = z.object({
  pool: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    domain: z.string({invalid_type_error: 'Domain must be a string'}),
    port: z.number({invalid_type_error: 'Port must be a number'}),
    cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
  }),
  poolPassword: z.string({invalid_type_error: 'PoolPassword must be a string'}).optional().nullable(),
  wallet: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'}),
    address: z.string({invalid_type_error: 'Address must be a string'}),
    cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
  })
})
export type CoinConfig = z.infer<typeof CoinConfig>;

export const MiningConfig = z.object({
  $type: z.enum(["CPU", "GPU"], {invalid_type_error: 'Type must be a string'}),
  coinConfigs: CoinConfig.array(),
  additionalArguments: z.string().optional().nullable(),
  hugePages: z.number({invalid_type_error: 'HugePage must be a number'}).optional().nullable(),
  configFileContent: z.string({invalid_type_error: 'ConfigFile must be a string'}).optional().nullable(),
  threadsCount: z.number({invalid_type_error: 'ThreadsCount must be a number'}).optional().nullable(),
})
export type MiningConfig = z.infer<typeof MiningConfig>;

export const Miner = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  supportedDevices: z.string({invalid_type_error: 'DevicesType must be a string'}) ,
  miningMode: z.string({invalid_type_error: 'MiningMode must be a string'}),
})
export type Miner = z.infer<typeof Miner>;

export const Target = z.object({
  miningConfig: MiningConfig,
  miner: Miner,
}, {invalid_type_error: 'Target must be an object'})
export type Target = z.infer<typeof Target>;

export const FlightSheet = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  targets: Target.array(),
}, {invalid_type_error: 'FlightSheet must be an object'})
export type FlightSheet = z.infer<typeof FlightSheet>;

export const FlightSheetPost = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  targets: z.object({
    miningConfig: z.object({
      $type: z.enum(["CPU", "GPU"], {invalid_type_error: 'Type must be a string'}),
      coinConfigs: z.object({
        poolId: z.string({invalid_type_error: 'PoolId must be a string'}),
        walletId: z.string({invalid_type_error: 'WalletId must be a string'}),
        poolPassword: z.string({invalid_type_error: 'PoolPassword must be a string'}).optional().nullable(),
      }, {invalid_type_error: 'Config must be an object'}).array(),
      additionalArguments: z.string().optional().nullable(),
      hugePages: z.number({invalid_type_error: 'HugePage must be a number'}).optional().nullable(),
      configFileContent: z.string({invalid_type_error: 'ConfigFile must be a string'}).optional().nullable(),
      threadsCount: z.number({invalid_type_error: 'ThreadsCount must be a number'}).optional().nullable(),      
    }),
    minerId: z.string({invalid_type_error: 'MinerId must be a string'}),
  }, {invalid_type_error: 'Targets must be an object'}).array(),
}, {invalid_type_error: 'FlightSheetPost must be an object'})
export type FlightSheetPost = z.infer<typeof FlightSheetPost>;