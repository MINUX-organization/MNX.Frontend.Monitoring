import { z } from "zod";
import { MiningStateSchema } from "../../model/mining-state";
import { FlightSheetScheme } from "../../model/flight-sheet.type";

export const GpuDynamicIndicatorsSchema = z.object({
  deviceId: z.string({invalid_type_error: 'Id must be a string'}),
  deviceName: z.string({invalid_type_error: 'Name must be a string'}),
  power: z.number({invalid_type_error: 'Power must be a number'}),
  fanSpeed: z.number({invalid_type_error: 'Fan speed must be a number'}),
  coreTemperature: z.number({invalid_type_error: 'Temperature core must be a number'}),
  memoryTemperature: z.number({invalid_type_error: 'Temperature memory must be a number'}),
  flightSheet: FlightSheetScheme,
  miningState: MiningStateSchema,
})

export type GpuDynamicIndicatorsType = z.infer<typeof GpuDynamicIndicatorsSchema>