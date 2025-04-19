import { z } from "zod";

export const SliderSchema = z.object({
  label: z.string({invalid_type_error: 'Label must be a string'}),
  values: z.array(z.object({
    label: z.string({invalid_type_error: 'Label must be a string'}),
    min: z.number({invalid_type_error: 'Min must be a number'}),
    max: z.number({invalid_type_error: 'Max must be a number'}),
    default: z.number({invalid_type_error: 'Default must be a number'}),
    isWritable: z.boolean({invalid_type_error: 'IsWritable must be a boolean'}),
    value: z.number({invalid_type_error: 'Value must be a number'}).optional(),
    unit: z.string({invalid_type_error: 'Unit must be a string'}),
  }))
})
export type SliderType = z.infer<typeof SliderSchema>