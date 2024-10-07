import { z } from "zod";

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

export const Target = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  $type: z.enum(["CPU", "GPU"], {invalid_type_error: 'Type must be a string'}),
  configs: Config.array(),
  additionalArguments: z.string().optional(),
  minerId: z.string({invalid_type_error: 'MinerId must be a string'}),
  minerName: z.string({invalid_type_error: 'MinerName must be a string'}),
  hugePage: z.number({invalid_type_error: 'HugePage must be a number'}).optional(),
  configFile: z.string({invalid_type_error: 'ConfigFile must be a string'}),
})
export type Target = z.infer<typeof Target>;

export const Flightsheet = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  devices: RigDevices.array(),
  target: Target.array(),
})
export type Flightsheet = z.infer<typeof Flightsheet>;