import { getPresetsListByGpuNameApi } from "@/shared/api/get/getPresetsListByGpuName";
import { useQuery, useQueryClient } from "react-query";
import { PostPresetOverclocking, Preset, PresetGroupedList } from "./types";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import _ from "lodash";

export function usePresetByGpuNameRepository() {
  const queryClient = useQueryClient();

  const { data,...presetQuery } = useQuery(['presetsListByGpuName'], getPresetsListByGpuNameApi);

  const PresetsByGpuNameList = ZodSaveParse(data, PresetGroupedList.array().optional());
  
  const addPresetToList = (preset: Preset) => {
    if (!_.find(PresetsByGpuNameList, (card) => card.name === preset.deviceName)) {
      queryClient.setQueryData(['presetsListByGpuName'], [...PresetsByGpuNameList ?? [], { name: preset.deviceName, presets: [preset] }])
      return;
    }

    const newCards = _.map(PresetsByGpuNameList, (card) => {
      if (card.name === preset.deviceName) {
        return { name: card.name, presets: _.concat(preset, card.presets) }
      }

      return card;
    });

    queryClient.setQueryData(['presetsListByGpuName'], [...newCards]);
  }

  const editPresetInList = (presetId: string, preset: PostPresetOverclocking) => {
    const newCards = _.map(PresetsByGpuNameList, (card) => {
      if (card.name === preset.deviceName) {
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
      if (card.name !== preset.deviceName) {
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