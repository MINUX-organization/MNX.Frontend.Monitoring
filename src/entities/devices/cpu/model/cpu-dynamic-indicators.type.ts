import { FlightSheetScheme } from "../../model/flight-sheet.type";
import { z } from "zod";
import { MiningStateSchema } from "../../model/mining-state";

export const CpuDynamicIndicatorsSchema = z.object({
  deviceId: z.string({invalid_type_error: 'Id must be a string'}),
  deviceName: z.string({invalid_type_error: 'Name must be a string'}),
  miningState: MiningStateSchema,
  temperature: z.number({invalid_type_error: 'Temperature must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'fan must be a number'}),
  power: z.number({invalid_type_error: 'Power must be a number'}),
  flightSheet: FlightSheetScheme,
})
export type CpuDynamicIndicatorsType = z.infer<typeof CpuDynamicIndicatorsSchema>