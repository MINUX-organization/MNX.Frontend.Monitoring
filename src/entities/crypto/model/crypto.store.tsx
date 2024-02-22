import { create } from "zustand";
import { Crypto } from "./types";

interface CryptoState {
  cryptosList: Crypto[];
  isCryptosListLoading: boolean;
  setCryptosList: (cryptos: Crypto[]) => void;
  setIsCryptosListLoading: (isLoading: boolean) => void;
  addCryptoList: (crypto: Crypto) => void;
}

export const useCryptoStore = create<CryptoState>(
  (set) => ({
    cryptosList: [],
    isCryptosListLoading: true,
    setCryptosList: (cryptosList: Crypto[]) => set({ cryptosList }),
    setIsCryptosListLoading: (isCryptosListLoading) => set({ isCryptosListLoading }),
    addCryptoList: (crypto: Crypto) => set((state) => ({
      cryptosList: [...state.cryptosList, crypto]
    }))
}))