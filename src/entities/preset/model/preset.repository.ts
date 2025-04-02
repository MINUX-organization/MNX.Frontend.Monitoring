import { applyPresetDevicesApi, deletePresetApi, editPresetApi, getPresetsApi, getPresetsGroupedByGpuApi, savePresetApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PresetSchema, PresetType } from "./preset.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";
import { PresetGroupedByGpuType } from "./preset-grouped-by-gpu.type";
import { useCallback, useMemo } from "react";
import _ from "lodash";
import { PresetDevicesType } from "./preset-devices.type";
import { getPresetByIdApi, getPresetDevicesApi, getPresetDevicesSupportedApi } from "@/shared/api/preset";

export const presetQueryOptions = queryOptions({
  queryKey: ['presets'],
  queryFn: () => getPresetsApi<PresetType[]>()
})

export const presetByIdQueryOptions = (id?: string) => queryOptions({
  queryKey: ['presets', id],
  queryFn: () => getPresetByIdApi<PresetType>(id!),
  enabled: !!id
})

export const presetRigDevicesQueryOptions = (id: string) => queryOptions({
  queryKey: ['presets', id, 'devices'],
  queryFn: () => getPresetDevicesApi<PresetDevicesType[]>(id),
  enabled: !!id
})

export const presetRigDevicesSupportQueryOptions = (id: string) => queryOptions({
  queryKey: ['presets', id, 'devices-support'],
  queryFn: () => getPresetDevicesSupportedApi<PresetDevicesType[]>(id),
  enabled: !!id
})

export const presetsByDeviceNameQueryOptions = (deviceName?: string) => queryOptions({
  queryKey: ['presets', deviceName, 'by-device-name'],
  queryFn: () => getPresetsApi<PresetType[]>(deviceName)
})

export const presetGroupedByGpuQueryOptions = queryOptions({
  queryKey: ['presets', 'grouped-by-gpu'],
  queryFn: () => getPresetsGroupedByGpuApi<PresetGroupedByGpuType[]>()
})

const usePresetQuery = () => {
  const { data, ...query } = useQuery(presetQueryOptions);

  const presets = useMemo(
    () => zodSaveParse(data?.data, PresetSchema.array().optional()),
    [data?.data]
  );

  const getById = useCallback(
    (id?: string) => {
      if (!id) return undefined;  
      return _.find(presets, (preset) => preset.id === id);
    },
    [presets]
  )

  return { presets, getById, ...query }
}

const usePresetMutation = () => {
  const queryClient = useQueryClient();

  const savePresetMutation = useMutation({
    mutationFn: (data: Omit<PresetType, 'id'>) => savePresetApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presets'] });
      toaster.success({
        description: 'You have successfully added preset',
      })
    }
  })

  const editPresetMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & PresetType) => editPresetApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presets'] });
      toaster.success({
        description: 'You have successfully edited preset',
      })
    },
  });

  const deletePresetMutation = useMutation({
    mutationFn: (id: string) => deletePresetApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presets'] });
      toaster.success({
        description: 'You have successfully deleted preset',
      })
    },
  })

  const applyPresetDevicesMutation = useMutation({
    mutationFn: ({id, data} : {id: string, data: string[]}) => applyPresetDevicesApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presets'] });
      toaster.success({
        description: 'You have successfully applied preset',
      })
    },
  })

  return {
    savePreset: savePresetMutation.mutateAsync,
    editPreset: editPresetMutation.mutateAsync,
    deletePreset: deletePresetMutation.mutateAsync,
    applyPresetDevices: applyPresetDevicesMutation.mutateAsync,
  }
}

export const presetRepository = {
  usePresetQuery,
  usePresetMutation,
}