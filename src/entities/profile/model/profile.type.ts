import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  login: z.string({invalid_type_error: 'Login must be a string'}),
  nickname: z.string({invalid_type_error: 'Nickname must be a string'}),
  registrationDate: z.string({invalid_type_error: 'Registration date must be a string'}),
  email: z.string({invalid_type_error: 'Email must be a string'}).optional(),
  telegram: z.string({invalid_type_error: 'Telegram must be a string'}).optional(),
  key: z.string({invalid_type_error: 'Key must be a string'}).optional(),
  emailConfirmed: z.boolean({invalid_type_error: 'Email confirmed must be a boolean'}),
  telegramConfirmed: z.boolean({invalid_type_error: 'Telegram confirmed must be a boolean'}),
})
export type ProfileType = z.infer<typeof ProfileSchema>