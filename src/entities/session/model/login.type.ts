import { z } from "zod";

export const LoginSchema = z.object({
  login: z
    .string({invalid_type_error: 'Login must be a string'})
    .nonempty({message: 'Login is required'})
    .regex(/^[a-zA-Z0-9_\-.]*$/, {
      message: "Login can only contain letters, numbers, _, -, .",
    }),
  password: z.string({invalid_type_error: 'Password must be a string'})
    .min(8)
    .max(100)
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
})
export type LoginType = z.infer<typeof LoginSchema>