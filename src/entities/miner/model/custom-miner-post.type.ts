import { z } from "zod";

export const CustomMinerPostSchema = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  installationUrl: z.string({invalid_type_error: 'Installation url must be a string'}),
  poolTemplate: z.string({invalid_type_error: 'Pool template must be a string'}).optional(),
  walletWorkerTemplate: z.string({invalid_type_error: 'Wallet worker template must be a string'}).optional(),
  supportedDevices: z.enum(['NvidiaGpu', 'IntelGpu', 'IntelCpu', 'AmdGpu', 'AmdCpu', 'None']).array(),
  miningMode: z.enum(['Single', 'Dual', 'Triple'], {invalid_type_error: 'Mining mode must be a string'}),
})
export type CustomMinerPost = z.infer<typeof CustomMinerPostSchema>