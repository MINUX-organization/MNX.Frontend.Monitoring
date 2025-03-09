import { getGpusUniqueNamesApi } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";

export const gpuUniqueNamesOptions = queryOptions({
  queryKey: ['gpu-unique-names'],
  queryFn: () => getGpusUniqueNamesApi<string[]>(),
  staleTime: 5000,
})