import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

// todo: change type
type Response = {
  id: string;
  name: string;
  deviceName: string;
  overclocking: {
    $type: 'GPU' | 'CPU';
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

type Request = {
  name: string;
  deviceName: string;
  overclocking: {
    $type: 'GPU' | 'CPU';
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
};

// todo: change type
export const addPresetApi = async (data: Request) => 
  (await apiInstance().post<Response>(BACKEND_APIS.PRESETS, data)).data
