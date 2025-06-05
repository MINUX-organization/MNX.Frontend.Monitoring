import { z } from "zod";

export const MinerSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  ownerId: z.string({invalid_type_error: 'Owner id must be a string'}).optional(),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  algorithms: z.array(z.object({
    algorithmId: z.string({invalid_type_error: 'Algorithm id must be a string'}),
    minerId: z.string({invalid_type_error: 'Miner id must be a string'}),
    name: z.string({invalid_type_error: 'Name must be a string'})
  })),
  installationUrl: z.string({invalid_type_error: 'Installation url must be a string'}),
  poolTemplate: z.string({invalid_type_error: 'Pool template must be a string'}).optional(),
  walletWorkerTemplate: z.string({invalid_type_error: 'Wallet worker template must be a string'}).optional(),
  supportedDevices: z.enum(['NvidiaGpu', 'IntelGpu', 'IntelCpu', 'AmdGpu', 'AmdCpu', 'None']).array(),
  miningMode: z.enum(['Single', 'Dual', 'Triple'], {invalid_type_error: 'Mining mode must be a string'}),
})
export type MinerType = z.infer<typeof MinerSchema>