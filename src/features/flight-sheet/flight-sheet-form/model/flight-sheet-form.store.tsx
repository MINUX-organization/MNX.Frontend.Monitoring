import { create } from 'zustand'

type FlightSheetFormStore = {
  reset: (() => void) | null;
  formRef: React.RefObject<HTMLFormElement | null> | null;
  clearUploadFiles: (() => void)[];
  activeTargets: Record<'GPU' | 'CPU', boolean>;
  mode: 'add' | 'edit'
}

type Actions = {
  setReset: (reset: () => void) => void;
  setFormRef: (ref: React.RefObject<HTMLFormElement | null>) => void;
  addClearUploadFiles: (clear: () => void) => void
  setActiveTargets: (targets: Record<'GPU' | 'CPU', boolean>) => void;
  setMode: (mode: 'add' | 'edit') => void
}

export const useFlightSheetFormStore = create<FlightSheetFormStore & Actions>((set) => ({
  reset: null,
  formRef: null,
  clearUploadFiles: [],
  activeTargets: { GPU: false, CPU: false },
  mode: 'add',
  setReset: (reset) => set(() => ({ reset })),
  setFormRef: (ref) => set(() => ({ formRef: ref })),
  addClearUploadFiles: (clear) => set((state) => ({ clearUploadFiles: [...state.clearUploadFiles, clear] })),
  setActiveTargets: (activeTargets) => set({ activeTargets }),
  setMode: (mode) => set({ mode })
}))