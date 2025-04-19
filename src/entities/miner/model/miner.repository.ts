import { getMinersApi } from "@/shared/api"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { MinerSchema, MinerType } from "./miner.type"
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse"

export const minerQueryOptions = queryOptions({
  queryKey: ['miner'],
  queryFn: () => getMinersApi<MinerType[]>(),
})

export const useMinerQuery = () => {
  const { data, ...query } = useQuery(minerQueryOptions)

  const miners = zodSaveParse(data?.data, MinerSchema.array().optional());

  return {
    miners,
    ...query
  }
}

export const minerRepository = {
  useMinerQuery,
  // useMinerMutation,
}