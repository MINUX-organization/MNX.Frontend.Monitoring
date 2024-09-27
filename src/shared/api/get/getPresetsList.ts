import { MeasureUnit } from "@/shared/types/measure-unit";
import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  name: string;
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

export const getPresetsListApi = async () => 
  (await apiInstance().get(BACKEND_APIS.PRESETS)).data as Response[];