import { z } from "zod";

export const MiningStateSchema = z
  .enum(['Active', 'Inactive', 'Error'], {invalid_type_error: 'Mining state must be a string'})
export type MiningStateType = z.infer<typeof MiningStateSchema>