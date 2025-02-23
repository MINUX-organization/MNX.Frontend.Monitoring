import { z } from "zod";

export const MinerSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  supportedAlgorithms: z.array(z.object({
    algorithmId: z.string({invalid_type_error: 'Algorithm id must be a string'}),
    minerId: z.string({invalid_type_error: 'Miner id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'})
  })),
  supportedDevices: z.string({invalid_type_error: 'Supported devices must be a string'}),
  miningMode: z.enum(['Single', 'Dual', 'Triple'], {invalid_type_error: 'Mining mode must be a string'}),
})
export type MinerType = z.infer<typeof MinerSchema>