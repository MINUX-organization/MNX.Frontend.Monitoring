import { AlgorithmSchema, AlgorithmType } from "./algorithm.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAvailableAlgorithmsApi } from "@/shared/api";

export const algorithmQueryOptions = queryOptions({
  queryKey: ['algorithm'],
  queryFn: () => getAvailableAlgorithmsApi<AlgorithmType[]>(),
})

export const useAlgorithmQuery = () => {
  const { data, ...query } = useQuery(algorithmQueryOptions);

  const algorithms = zodSaveParse(data?.data, AlgorithmSchema.array().optional());

  return { algorithms, ...query }
}

export const algorithmRepository = {
  useAlgorithmQuery,
}