import { Preset } from '@/entities/preset';
import { SliderParameter } from '@/shared/types/slider-types'
import { create } from 'zustand'

export enum State {
  Editing = 'editing',
  Creating = 'creating',
  Idle = 'idle',
  Gpu = 'gpu',
}

type PresetModalState = {
  selectedGpuName?: string;
  selectedPreset?: Preset;
  slidersParameters?: SliderParameter,
  modalState: State,
}

type Actions = {
  setGpuName: (gpuName?: string) => void
  setPreset: (selectedPreset?: Preset) => void
  setSlidersParameters: (params?: SliderParameter) => void;
  setModalState: (state: State) => void;
}

export const usePresetStateStore = create<PresetModalState & Actions>((set) => ({
  selectedGpuName: undefined,
  selectedPreset: undefined,
  slidersParameters: undefined,
  modalState: State.Idle,
  setGpuName: (newGpuName) => set({ selectedGpuName: newGpuName }),
  setPreset: (newPreset) => set({ selectedPreset: newPreset }),
  setSlidersParameters: (newSLidersParameters) => set({ slidersParameters: newSLidersParameters }),
  setModalState: (newState) => set({ modalState: newState }),
}))