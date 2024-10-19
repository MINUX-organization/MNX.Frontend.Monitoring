import { FlightSheet } from "@/entities/flightsheet";
import { create } from "zustand";

type FlightSheetModalState = {
  selectedFlightSheet?: FlightSheet;
}

type Actions = {
  setSelectedFlightSheet: (state?: FlightSheet) => void
}

export const useFlightSheetStateStore = create<FlightSheetModalState & Actions>((set) => ({
  selectedFlightSheet: undefined,
  setSelectedFlightSheet: (newState) => set({ selectedFlightSheet: newState }),
}))