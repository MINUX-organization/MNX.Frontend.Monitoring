import { deletePresetApi, editPresetApi, getPresetsApi, getPresetsGroupedByGpuApi, savePresetApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PresetSchema, PresetType } from "./preset.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";
import { PresetGroupedByGpuType } from "./preset-grouped-by-gpu.type";
import { useMemo } from "react";

export const presetQueryOptions = queryOptions({
  queryKey: ['presets'],
  queryFn: () => getPresetsApi<PresetType[]>()
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

  return { presets, ...query }
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

  return {
    savePreset: savePresetMutation.mutateAsync,
    editPreset: editPresetMutation.mutateAsync,
    deletePreset: deletePresetMutation.mutateAsync,
  }
}

export const presetRepository = {
  usePresetQuery,
  usePresetMutation,
}