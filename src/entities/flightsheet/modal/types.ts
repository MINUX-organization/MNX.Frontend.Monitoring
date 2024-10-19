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

export const RigDevices = z.object({
  name: z.string({invalid_type_error: 'RigName must be a string'}),
  devices: z.array(z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'}),
    busId: z.string({invalid_type_error: 'BusId must be a string'}),
  }))
})

export const Config = z.object({
  pool: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    domain: z.string({invalid_type_error: 'Domain must be a string'}),
    port: z.number({invalid_type_error: 'Port must be a number'}),
    cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
  }),
  poolPassword: z.string({invalid_type_error: 'PoolPassword must be a string'}),
  wallet: z.object({
    id: z.string({invalid_type_error: 'Id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'}),
    address: z.string({invalid_type_error: 'Address must be a string'}),
    cryptocurrency: z.string({invalid_type_error: 'Cryptocurrency must be a string'})
  })
})
export type Config = z.infer<typeof Config>;

export const Miner = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  devicesType: z.string({invalid_type_error: 'DevicesType must be a string'}),
  miningMode: z.string({invalid_type_error: 'MiningMode must be a string'}),
})
export type Miner = z.infer<typeof Miner>;

export const Target = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  $type: z.enum(["CPU", "GPU"], {invalid_type_error: 'Type must be a string'}),
  configs: Config.array(),
  additionalArguments: z.string().optional(),
  miner: Miner,
  hugePage: z.number({invalid_type_error: 'HugePage must be a number'}).optional(),
  configFile: z.string({invalid_type_error: 'ConfigFile must be a string'}).optional(),
})
export type Target = z.infer<typeof Target>;

export const FlightSheet = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  devices: RigDevices.array(),
  target: Target.array(),
})
export type FlightSheet = z.infer<typeof FlightSheet>;

export const FlightSheetPost = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  target: Target.array(),
})
export type FlightSheetPost = z.infer<typeof FlightSheetPost>;