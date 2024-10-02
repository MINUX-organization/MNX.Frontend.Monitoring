import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

type Request = {
  name: string;
  gpuName: string;
  overclocking: {
    powerLimit: number;
    fanSpeed: number;
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

export const editPresetApi = async (id: string, data: Request) => 
  (await apiInstance().put(`${BACKEND_APIS.PRESETS}/${id}`, data)).data;