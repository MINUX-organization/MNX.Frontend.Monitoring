import { z } from "zod";
import { FlightSheetTargetSchema, PostFlightSheetTargetSchema } from "./flight-sheet-target.type";

export const FlightSheetSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  targets: FlightSheetTargetSchema.array(),
})
export type FlightSheetType = z.infer<typeof FlightSheetSchema>

export const PostFlightSheetSchema = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}).nonempty({message: 'Name is required'}),
  targets: PostFlightSheetTargetSchema.array(),
})
export type PostFlightSheetType = z.infer<typeof PostFlightSheetSchema>