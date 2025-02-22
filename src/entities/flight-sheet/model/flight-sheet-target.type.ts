import { z } from "zod";
import { 
  FlightSheetTargetMiningConfigSchema, 
  PostFlightSheetTargetMiningConfigSchema 
} from "./flight-sheet-target-mining-config.type";
import { FlightSheetTargetMinerSchema } from "./flight-sheet-target-miner.type";

export const FlightSheetTargetSchema = z.object({
  miningConfig: FlightSheetTargetMiningConfigSchema,
  miner: FlightSheetTargetMinerSchema
})
export type FlightSheetTargetType = z.infer<typeof FlightSheetTargetSchema>

export const PostFlightSheetTargetSchema = z.object({
  miningConfig: PostFlightSheetTargetMiningConfigSchema,
  minerId: z.string({invalid_type_error: 'Miner id must be a string'}).nonempty({message: 'Miner is required'})
})
export type PostFlightSheetTargetType = z.infer<typeof PostFlightSheetTargetSchema>