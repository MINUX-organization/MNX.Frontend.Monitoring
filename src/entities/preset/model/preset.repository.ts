import { editPresetApi, getPresetsApi, savePresetApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PresetSchema, PresetType } from "./preset.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";

export const presetQueryOptions = queryOptions({
  queryKey: ['presets'],
  queryFn: () => getPresetsApi<PresetType[]>()
})

const usePresetQuery = () => {
  const { data, ...query } = useQuery(presetQueryOptions);

  const presets = zodSaveParse(data?.data, PresetSchema.array().optional());

  return { presets, ...query }
}

const usePresetMutation = () => {
  const queryClient = useQueryClient();

  const savePresetMutation = useMutation({
    mutationFn: (data: PresetType) => savePresetApi(data),
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
  })

  return {
    savePreset: savePresetMutation.mutateAsync,
    editPreset: editPresetMutation.mutateAsync,
  }
}

export const presetRepository = {
  usePresetQuery,
  usePresetMutation,
}