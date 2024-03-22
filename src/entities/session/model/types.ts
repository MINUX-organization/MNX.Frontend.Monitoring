import { z } from "zod";

export const Session = z.object({
  access_token: z.string({invalid_type_error: 'Access token must be a string'}),
  refresh_token: z.string({invalid_type_error: 'Refresh token must be a string'}),
  access_expires_in: z.string({invalid_type_error: 'Access expires in must be a string'}),
  refresh_expires_in: z.string({invalid_type_error: 'Refresh expires in must be a string'})
})
export type Session = z.infer<typeof Session>