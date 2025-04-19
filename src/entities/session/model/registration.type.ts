import { z } from "zod";

export const RegistrationSchema = z.object({
  login: z.string({invalid_type_error: 'Login must be a string'}),
  password: z.string({invalid_type_error: 'Password must be a string'})
})
export type RegistrationType = z.infer<typeof RegistrationSchema>