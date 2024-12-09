import { z } from "zod";

export const Miner = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  devicesType: z.string({invalid_type_error: 'DevicesType must be a string'}).array(),
  miningMode: z.string({invalid_type_error: 'MiningMode must be a string'}),
})
export type Miner = z.infer<typeof Miner>