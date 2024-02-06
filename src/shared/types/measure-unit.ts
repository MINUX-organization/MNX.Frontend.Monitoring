import { z } from "zod"

export const MeasureUnit = z.object({
  value: z.number(),
  measureUnit: z.string()
})

export type MeasureUnit = z.infer<typeof MeasureUnit>