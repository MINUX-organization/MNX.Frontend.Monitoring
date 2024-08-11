import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";
import { getPresetsListApi } from "@/shared/api/get/getPresetsList";
import { Preset } from "./types";
import { addPresetApi } from "@/shared/api/post/addPreset";
import { deletePresetApi } from "@/shared/api/delete/deletePreset";

export function usePresetRepository() {
  const queryClient = useQueryClient();
  const { data, ...presetQuery } = useQuery(['presetsList'], getPresetsListApi);

  const PresetsList = ZodSaveParse(data, Preset.array().optional());
  
  const addPresetMutation = useMutation({
    mutationFn: (Preset: { cardName: string, presetName: string }) => addPresetApi(Preset),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['presetsList'], _.concat(PresetsList, data))
    }
  });

  const deletePresetMutation = useMutation({
    mutationFn: (id: string) => deletePresetApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['presetsList'],
         _.filter(PresetsList, (Preset) => Preset.id !== variables)
      )
    }
  });
  
  const addPreset = (Preset: { cardName: string, presetName: string }) => {
    addPresetMutation.mutate(Preset);
  }

  const deletePreset = (id: string) => {
    deletePresetMutation.mutate(id);
  }

  const getPresetsList = () => PresetsList;

  const setPresetsList = (PresetsList?: Preset[]) => {
    if (!PresetsList) return;
    queryClient.setQueryData(['presetsList'], PresetsList);
  }
    
  return {
    addPreset,
    deletePreset,
    getPresetsList,
    setPresetsList,
    ...presetQuery
  }
}