import { z } from "zod";

export const Crypto = z.object({
  shortName: z.string({invalid_type_error: 'ShortName must be a string'}),
  fullName: z.string({invalid_type_error: 'FullName must be a string'}),
  algorithm: z.string({invalid_type_error: 'Algorithm must be a string'})
})
export type Crypto = z.infer<typeof Crypto>