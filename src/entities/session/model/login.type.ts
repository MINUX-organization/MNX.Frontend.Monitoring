import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string({invalid_type_error: 'Login must be a string'}),
  password: z.string({invalid_type_error: 'Password must be a string'})
})
export type LoginType = z.infer<typeof LoginSchema>