import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const Preset = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  memoryVendor: z.string({invalid_type_error: 'MemoryVendor must be a string'}),
  memoryType: z.string({invalid_type_error: 'MemoryType must be a string'}),
  powerLimit: MeasureUnit,
  fanSpeed: z.number({invalid_type_error: 'FanSpeed must be a number'}),
  criticalTemperature: z.number({invalid_type_error: 'CriticalTemperature must be a number'}),
  memoryClockLock: MeasureUnit,
  memoryClockOffset: MeasureUnit,
  memoryVoltage: MeasureUnit,
  memoryVoltageOffset: MeasureUnit,
  coreClockLock: MeasureUnit,
  coreClockOffset: MeasureUnit,
  coreVoltage: MeasureUnit,
  coreVoltageOffset: MeasureUnit
})
export type Preset = z.infer<typeof Preset>