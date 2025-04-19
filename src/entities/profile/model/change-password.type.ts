import { z } from "zod"

const PasswordScheme = z
  .string({invalid_type_error: 'Password must be a string'})
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
})

export const ChangePasswordSchema = z.object({
  password: PasswordScheme,
  newPassword: PasswordScheme,
})
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>