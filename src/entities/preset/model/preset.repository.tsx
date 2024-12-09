import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";
import { getPresetsListApi } from "@/shared/api/get/getPresetsList";
import { PostPresetOverclocking, Preset } from "./types";
import { addPresetApi } from "@/shared/api/post/addPreset";
import { deletePresetApi } from "@/shared/api/delete/deletePreset";
import { editPresetApi } from "@/shared/api/patch/editPreset";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";

// const presetsListMock: Preset[] = [
//   {
//     id: "1",
//     name: "Preset 1",
//     gpuName: "NVIDIA GeForce RTX 3080",
//     overclocking: {
//       coreClockLock: 1500,
//       coreClockOffset: 100,
//       memoryClockLock: 1000,
//       memoryClockOffset: 100,
//       coreVoltage: 1000,
//       coreVoltageOffset: 100,
//       memoryVoltage: 1000,
//       memoryVoltageOffset: 100,
//       powerLimit: 100,
//       fanSpeed: 50,
//     }
//   },
//   {
//     id: "2",
//     name: "Preset 2",
//     gpuName: "NVIDIA GeForce RTX 3080",
//     overclocking: {
//       coreClockLock: 1600,
//       coreClockOffset: 100,
//       memoryClockLock: 1100,
//       memoryClockOffset: 100,
//       coreVoltage: 1100,
//       coreVoltageOffset: 100,
//       memoryVoltage: 1100,
//       memoryVoltageOffset: 100,
//       powerLimit: 100,
//       fanSpeed: 60,
//     }
//   }
// ]

export function usePresetRepository() {
  const queryClient = useQueryClient();
  const { data, isLoading, ...presetQuery } = useQuery(['presetsList'], getPresetsListApi);

  const PresetsList = ZodSaveParse(data, Preset.array().optional());

  const addPresetMutation = useMutation({
    mutationFn: (Preset: PostPresetOverclocking) => addPresetApi(Preset),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['presetsList'], _.concat(data, PresetsList))
    }
  });

  const editPresetMutation = useMutation({
    mutationFn: (value: {id: string, preset: PostPresetOverclocking}) => editPresetApi(value.id, value.preset),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['presetsList'],
        _.map(PresetsList, (preset) => preset.id === data.id ? data : preset)
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
    },
  });
  
  const addPreset = async (preset: PostPresetOverclocking) => {
    const status = await addPresetMutation.mutateAsync(preset);

    return {isSuccess: IS_SUCCESS_STATUS(status), data: status}; 
  }

  const editPreset = async (id: string, preset: PostPresetOverclocking) => {
    const status = await editPresetMutation.mutateAsync({id, preset});

    return IS_SUCCESS_STATUS(status);
  }

  const deletePreset = async (id: string) => {
    const status = (await deletePresetMutation.mutateAsync(id)).status;

    return IS_SUCCESS_STATUS(status);  
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
    isLoading,
    ...presetQuery
  }
}