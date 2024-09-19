import { MeasureUnit } from "@/shared/types/measure-unit";
import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

// todo: change type
type Response = {
  id: string;
  name: string;
  gpuName: string;
  overclocking: {
    memoryVendor: string;
    memoryType: string;
    powerLimit: number;
    fanSpeed: number;
    criticalTemperature: number;
    memoryClockLock: number;
    memoryClockOffset: number;
    memoryVoltage: number;
    memoryVoltageOffset: number;
    coreClockLock: number;
    coreClockOffset: number;
    coreVoltage: number;
    coreVoltageOffset: number;
  }
}

type Request = {
  presetName: string;
  cardName: string;
};

// todo: change type
export const addPresetApi = async (data: Request) => 
  (await apiInstance().post<Response>(BACKEND_APIS.PRESETS, data)).data
