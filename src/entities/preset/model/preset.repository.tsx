import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";
import { getPresetsListApi } from "@/shared/api/get/getPresetsList";
import { PostPresetOverclocking, Preset } from "./types";
import { addPresetApi } from "@/shared/api/post/addPreset";
import { deletePresetApi } from "@/shared/api/delete/deletePreset";
import { editPresetApi } from "@/shared/api/patch/editPreset";

const presetsListMock: Preset[] = [
  {
    id: "1",
    name: "Preset 1",
    gpuName: "NVIDIA GeForce RTX 3080",
    overclocking: {
      coreClockLock: 1500,
      coreClockOffset: 100,
      memoryClockLock: 1000,
      memoryClockOffset: 100,
      coreVoltage: 1000,
      coreVoltageOffset: 100,
      memoryVoltage: 1000,
      memoryVoltageOffset: 100,
      powerLimit: 100,
      fanSpeed: 50,
    }
  },
  {
    id: "2",
    name: "Preset 2",
    gpuName: "NVIDIA GeForce RTX 3080",
    overclocking: {
      coreClockLock: 1600,
      coreClockOffset: 100,
      memoryClockLock: 1100,
      memoryClockOffset: 100,
      coreVoltage: 1100,
      coreVoltageOffset: 100,
      memoryVoltage: 1100,
      memoryVoltageOffset: 100,
      powerLimit: 100,
      fanSpeed: 60,
    }
  }
]

export function usePresetRepository() {
  const queryClient = useQueryClient();
  const { data, ...presetQuery } = useQuery(['presetsList'], getPresetsListApi);

  const PresetsList = import.meta.env.PROD ? ZodSaveParse(data, Preset.array().optional()) : presetsListMock;
  
  const addPresetMutation = useMutation({
    mutationFn: (Preset: PostPresetOverclocking) => addPresetApi(Preset),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['presetsList'], _.concat(PresetsList, data))
    }
  });

  const editPresetMutation = useMutation({
    mutationFn: (value: {id: string, preset: PostPresetOverclocking}) => editPresetApi(value.id, value.preset),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['presetsList'],
        _.map(PresetsList, (pool) => pool.id === data.id ? data : pool)
      )
    }
  })

  const deletePresetMutation = useMutation({
    mutationFn: (id: string) => deletePresetApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['presetsList'],
         _.filter(PresetsList, (Preset) => Preset.id !== variables)
      )
    }
  });
  
  const addPreset = (preset: PostPresetOverclocking) => {
    addPresetMutation.mutate(preset);
  }

  const editPreset = (id: string, preset: PostPresetOverclocking) => {
    editPresetMutation.mutate({id, preset});
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
    editPreset,
    deletePreset,
    getPresetsList,
    setPresetsList,
    ...presetQuery
  }
}