import { Preset } from '@/entities/preset';
import { SliderParameter } from '@/shared/types/slider-types'
import { create } from 'zustand'

type PresetModalState = {
  selectedGpuName?: string;
  selectedPreset?: Preset;
  slidersParameters?: SliderParameter
} 

type Actions = {
  setGpuName: (gpuName?: string) => void
  setPreset: (selectedPreset?: Preset) => void
  setSlidersParameters: (params?: SliderParameter) => void;
}

export const usePresetStateStore = create<PresetModalState & Actions>((set) => ({
  selectedGpuName: undefined,
  selectedPreset: undefined,
  slidersParameters: undefined,
  setGpuName: (newGpuName) => set({ selectedGpuName: newGpuName }),
  setPreset: (newPreset) => set({ selectedPreset: newPreset }),
  setSlidersParameters: (newSLidersParameters) => set({ slidersParameters: newSLidersParameters }),
}))