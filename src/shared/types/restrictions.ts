import { z } from "zod";

export const Restrictions = z.object({
  minimal: z.number({invalid_type_error: 'Minimal must be a number'}),
  maximal: z.number({invalid_type_error: 'Maximal must be a number'}),
  isWritable: z.boolean({invalid_type_error: 'IsWritable must be a boolean'}),
  default: z.number({invalid_type_error: 'Default must be a number'}),
}, {invalid_type_error: 'Clocking must be an object'})
export type Restrictions = z.infer<typeof Restrictions>