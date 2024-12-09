import { z } from "zod";

export function ZodSaveParse<T>(
  data: unknown, 
  schema: z.ZodType<T>, 
  callback?: (checkedData: T) => void
) {
  const checkedData = schema.safeParse(data);
  if (!checkedData.success) { 
    console.error(checkedData.error);
    return 
  }
  callback?.(checkedData.data);
  return checkedData.data
}