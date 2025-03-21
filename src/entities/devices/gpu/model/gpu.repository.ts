import { applyDeviceOverclockingApi, getDeviceOverclockingApi, getGpuDevices, getGpuRestrictionsApi } from "@/shared/api";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GpuRestrictionsSchema, GpuRestrictionsType } from "./restrictions.type";
import { GpuSchema, GpuType } from "./gpu.type";
import { useCallback, useMemo } from "react";
import { OverclockingGpuType } from "@/entities/preset";
import { toaster } from "@/shared/ui/toaster";
import _ from "lodash";

export const gpusQueryOptions = queryOptions({
  queryKey: ['gpus'],
  queryFn: () => getGpuDevices<GpuType[]>(),
  staleTime: 5000,
});

export const gpuRestrictionsOptions = (deviceName?: string) => queryOptions({
  queryKey: ['gpu', 'restrictions', deviceName],
  queryFn: () => getGpuRestrictionsApi<GpuRestrictionsType>(deviceName || ''),
  enabled: !!deviceName,
  staleTime: 5000,
});

export const useGpuRestrictions = (deviceName: string) => {
  const { data, ...query } = useQuery(gpuRestrictionsOptions(deviceName));

  const restrictions = zodSaveParse(data?.data, GpuRestrictionsSchema.optional());

  return { restrictions, ...query }
};

export const gpuOverclockingOptions = (deviceId: string) => queryOptions({
  queryKey: ['gpus', deviceId, 'overclocking'],
  queryFn: () => getDeviceOverclockingApi<OverclockingGpuType>(deviceId),
  enabled: !!deviceId,
});

export const useGpuQuery = () => {
  const { data, ...query } = useQuery(gpusQueryOptions);

  const gpus = useMemo(
    () => zodSaveParse(data?.data, GpuSchema.array().optional()),
    [data?.data]
  );

  const getById = useCallback(
    (id?: string) => {
      if (!id) return undefined;  
      return _.find(gpus, (gpu) => gpu.id === id);
    },
    [gpus]
  )

  return { gpus, getById, ...query }
}

export const useGpuMutation = () => {
  const queryClient = useQueryClient();

  const setOverclockingMutation = useMutation({
    mutationFn: ({data, id}: {data: OverclockingGpuType, id: string}) => applyDeviceOverclockingApi<OverclockingGpuType>(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gpus'] });
      toaster.success({
        description: "You have successfully applied overclocking on device"
      })
    }
  })

  return {
    setOverclocking: setOverclockingMutation.mutateAsync,
  }
}

export const gpuRepository = { 
  useGpuQuery,
  useGpuMutation,
}