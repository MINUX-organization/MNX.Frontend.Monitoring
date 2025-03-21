import { z } from "zod"
import { CoinScheme } from "./coin.type"

export const FlightSheetScheme = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  minerName: z.string({invalid_type_error: 'Miner name must be a string'}).optional(),
  coins: z.array(CoinScheme)
})
export type FlightSheetType = z.infer<typeof FlightSheetScheme>