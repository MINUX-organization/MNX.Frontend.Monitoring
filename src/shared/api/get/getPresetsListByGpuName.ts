import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  name: string;
  presets: {
    id: string;
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
  }[]
}

export const getPresetsListByGpuNameApi: () => Promise<Response[]> = async () => 
  (await apiInstance().get(`${BACKEND_APIS.PRESETS}/gpu_groups`)).data as Response[];