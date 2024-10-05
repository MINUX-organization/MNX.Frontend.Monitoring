import { z } from "zod";

export const Algorithm = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'})
})
export type Algorithm = z.infer<typeof Algorithm>

export const Crypto = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  shortName: z.string({invalid_type_error: 'ShortName must be a string'}),
  fullName: z.string({invalid_type_error: 'FullName must be a string'}),
  algorithm: Algorithm
})
export type Crypto = z.infer<typeof Crypto>

const PostCrypto = Crypto.omit({id: true})
export type PostCrypto = z.infer<typeof PostCrypto>