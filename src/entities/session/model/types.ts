import { z } from "zod";

export const Session = z.object({
  accessToken: z.string({invalid_type_error: 'Access token must be a string'}),
  refreshToken: z.string({invalid_type_error: 'Refresh token must be a string'}),
  refreshExpiration: z.string({invalid_type_error: 'Refresh expires in must be a string'})
})
export type Session = z.infer<typeof Session>