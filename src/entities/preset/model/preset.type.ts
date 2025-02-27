import { z } from "zod";
import { OverclockingSchema } from "./overclocking.type";

export const PresetSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  deviceName: z.string({invalid_type_error: 'Device name must be a string'}),
  overclocking: OverclockingSchema,
})
export type PresetType = z.infer<typeof PresetSchema>