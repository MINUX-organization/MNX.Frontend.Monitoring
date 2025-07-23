import { OverclockingType } from "@/shared/types";
import { create } from "zustand";

type PresetFormStore = {
  deviceName: string;
  mode: 'add' | 'edit';
  overclocking: OverclockingType | null
}

type Actions = {
  setDeviceName: (deviceName: string) => void
  setMode: (mode: 'add' | 'edit') => void
  setOverclocking: (overclocking: OverclockingType) => void
}

export const presetFormStore = create<PresetFormStore & Actions>((set) => ({
  deviceName: '',
  mode: 'add',
  overclocking: null,
  setDeviceName: (deviceName) => set({ deviceName }),
  setMode: (mode) => set({ mode }),
  setOverclocking: (overclocking) => set({ overclocking }),
}))