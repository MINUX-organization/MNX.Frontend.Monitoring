import { z } from "zod";

export const InputValuesSchema = z.object({
  label: z.string({invalid_type_error: 'Label must be a string'}),
  inputType: z.enum(['slider', 'checkbox', 'text', 'number', 'fanSpeed']).default('text'),
  min: z.number({invalid_type_error: 'Min must be a number'}).optional(),
  max: z.number({invalid_type_error: 'Max must be a number'}).optional(),
  default: z.number({invalid_type_error: 'Default must be a number'}).optional(),
  isWritable: z.boolean({invalid_type_error: 'IsWritable must be a boolean'}).default(true),
  value: z.union([
    z.number({invalid_type_error: 'Value must be a number'}),
    z.string({invalid_type_error: 'Value must be a string'}),
    z.boolean({invalid_type_error: 'Value must be a boolean'}),
    z.object({})
  ]).optional(),
  unit: z.string({invalid_type_error: 'Unit must be a string'}).optional(),
})
export type InputValuesType = z.infer<typeof InputValuesSchema>

export const InputSchema = z.object({
  label: z.string({invalid_type_error: 'Label must be a string'}),
  values: z.array(InputValuesSchema),
})
export type InputType = z.infer<typeof InputSchema>