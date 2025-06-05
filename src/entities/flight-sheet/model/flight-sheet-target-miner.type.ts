import { z } from "zod";

export const SupportedAlgorithmsSchema = z.object({
  algorithmId: z.string({invalid_type_error: 'Algorithm id must be a string'}),
  minerId: z.string({invalid_type_error: 'Miner id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
})
export type SupportedAlgorithmsType = z.infer<typeof SupportedAlgorithmsSchema>

export const FlightSheetTargetMinerSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  ownerId: z.string({invalid_type_error: 'Owner id must be a string'}).optional(),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  version: z.string({invalid_type_error: 'Version must be a string'}),
  algorithms: SupportedAlgorithmsSchema.array(),
  supportedDevices: z.enum(['NvidiaGpu', 'IntelGpu', 'IntelCpu', 'AmdGpu', 'AmdCpu', 'None']).array(),
  miningMode: z.enum(["Single", "Dual", "Triple"]),
})
export type FlightSheetTargetMinerType = z.infer<typeof FlightSheetTargetMinerSchema>