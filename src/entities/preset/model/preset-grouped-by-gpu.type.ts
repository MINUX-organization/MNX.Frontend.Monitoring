import { z } from "zod";
import { PresetSchema } from "./preset.type";

export const PresetGroupedByGpuSchema = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  presets: PresetSchema.array(),
})
export type PresetGroupedByGpuType = z.infer<typeof PresetGroupedByGpuSchema>