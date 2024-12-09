import { getPresetsListByGpuNameApi } from "@/shared/api/get/getPresetsListByGpuName";
import { useQuery, useQueryClient } from "react-query";
import { PostPresetOverclocking, Preset, PresetGroupedList } from "./types";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";

// const PresetMock: PresetGroupedList[] = [{
//   name: 'NVIDIA GeForce RTX 3080',
//   presets: [{
//     id: '1',
//     name: 'My Preset',
//     gpuName: 'NVIDIA GeForce RTX 3080',
//     overclocking: {
//       powerLimit: 150,
//       fanSpeed: 1200,
//       memoryClockLock: 3200,
//       memoryClockOffset: 100,
//       memoryVoltage: 1.35,
//       memoryVoltageOffset: 0.05,
//       coreClockLock: 3.2,
//       coreClockOffset: 100,
//       coreVoltage: 1.2,
//       coreVoltageOffset: 0.05,
//     }
//   },
//   {
//     id: '2',
//     name: 'My Preset',
//     gpuName: 'NVIDIA GeForce RTX 3080',
//     overclocking: {
//       powerLimit: 150,
//       fanSpeed: 1200,
//       memoryClockLock: 3200,
//       memoryClockOffset: 100,
//       memoryVoltage: 1.35,
//       memoryVoltageOffset: 0.05,
//       coreClockLock: 3.2,
//       coreClockOffset: 100,
//       coreVoltage: 1.2,
//       coreVoltageOffset: 0.05,
//     }
//   }],
// }, {
//   name: 'NVIDIA GeForce RTX 3090',
//   presets: [{
//     id: '3',
//     name: 'My Preset',
//     gpuName: 'NVIDIA GeForce RTX 3090',
//     overclocking: {
//       powerLimit: 150,
//       fanSpeed: 1200,
//       memoryClockLock: 3200,
//       memoryClockOffset: 100,
//       memoryVoltage: 1.35,
//       memoryVoltageOffset: 0.05,
//       coreClockLock: 3.2,
//       coreClockOffset: 100,
//       coreVoltage: 1.2,
//       coreVoltageOffset: 0.05,
//     }
//   }],
// }]

export function usePresetByGpuNameRepository() {
  const queryClient = useQueryClient();

  const { data, isLoading, ...presetQuery } = useQuery(['presetsListByGpuName'], getPresetsListByGpuNameApi);

  const PresetsByGpuNameList = ZodSaveParse(data, PresetGroupedList.array().optional());
  
  const addPresetToList = (preset: Preset) => {
    if (!_.find(PresetsByGpuNameList, (card) => card.name === preset.gpuName)) {
      queryClient.setQueryData(['presetsListByGpuName'], [...PresetsByGpuNameList ?? [], { name: preset.gpuName, presets: [preset] }])
      return;
    }

    const newCards = _.map(PresetsByGpuNameList, (card) => {
      if (card.name === preset.gpuName) {
        return { name: card.name, presets: _.concat(preset, card.presets) }
      }

      return card;
    });

    queryClient.setQueryData(['presetsListByGpuName'], [...newCards]);
  }

  const editPresetInList = (presetId: string, preset: PostPresetOverclocking) => {
    const newCards = _.map(PresetsByGpuNameList, (card) => {
      if (card.name === preset.gpuName) {
        return {name: card.name, presets: _.map(card.presets, (presetItem) => {
          if (presetItem.id === presetId) return {...presetItem, ...preset}

          return presetItem
        })}
      }

      return card;
    });

    queryClient.setQueryData(['presetsListByGpuName'], [...newCards]);
  }

  const deletePresetFromList = (preset: Preset) => {
    const newCards = _.map(PresetsByGpuNameList, (card) => {
      if (card.name !== preset.gpuName) {
        return card;
      }

      const filteredPresets = _.filter(card.presets, (presetItem) => presetItem.id !== preset.id)

      if (filteredPresets.length === 0) {
        return;
      }

      return {name: card.name, presets: filteredPresets}
    });

    const filteredCards = _.filter(newCards, (card) => card !== undefined)

    if (filteredCards.length === 0) {
      queryClient.setQueryData(['presetsListByGpuName'], []);
      return;
    }

    queryClient.setQueryData(['presetsListByGpuName'], [...filteredCards]);
  }

  const getPresetsByGpuNameList = () => PresetsByGpuNameList;

  return {
    PresetsByGpuNameList,
    getPresetsByGpuNameList,
    addPresetToList,
    editPresetInList,
    deletePresetFromList,
    ...presetQuery,
  }
}