import { z } from "zod";

export const PciSchema = z.object({
  id: z.number({invalid_type_error: 'Id must be a number'}),
  $type: z.string({invalid_type_error: 'Type must be a string'}).optional(),
  bus: z.string({invalid_type_error: 'Bus must be a string'}),
})
export type PciType = z.infer<typeof PciSchema>