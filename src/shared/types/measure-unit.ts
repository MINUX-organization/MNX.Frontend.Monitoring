import { z } from "zod"

export const MeasureUnit = z.object({
  value: z.number({ invalid_type_error: 'Value must be a number'}),
  measureUnit: z.string({ invalid_type_error: 'MeasureUnit must be a string'})
})

export type MeasureUnit = z.infer<typeof MeasureUnit>