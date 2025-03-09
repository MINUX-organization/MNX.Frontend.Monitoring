import { getGpuRestrictionsApi } from "@/shared/api";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { GpuRestrictionsSchema, GpuRestrictionsType } from "./restrictions.type";

export const gpuRestrictionsOptions = (deviceName: string) => queryOptions({
  queryKey: ['gpu', 'restrictions', deviceName],
  queryFn: () => getGpuRestrictionsApi<GpuRestrictionsType>(deviceName),
  enabled: !!deviceName,
  staleTime: 10000,
})

export const useGpuRestrictions = (deviceName: string) => {
  const { data, ...query } = useQuery(gpuRestrictionsOptions(deviceName));

  const restrictions = zodSaveParse(data?.data, GpuRestrictionsSchema.optional());

  return { restrictions, ...query }
}