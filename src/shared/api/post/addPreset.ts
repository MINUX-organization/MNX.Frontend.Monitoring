import { MeasureUnit } from "@/shared/types/measure-unit";
import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

// todo: change type
type Response = {
  id: string;
  name: string;
  memoryVendor: string;
  memoryType: string;
  powerLimit: MeasureUnit;
  fanSpeed: number;
  criticalTemperature: number;
  memoryClockLock: MeasureUnit;
  memoryClockOffset: MeasureUnit;
  memoryVoltage: MeasureUnit;
  memoryVoltageOffset: MeasureUnit;
  coreClockLock: MeasureUnit;
  coreClockOffset: MeasureUnit;
  coreVoltage: MeasureUnit;
  coreVoltageOffset: MeasureUnit;
}

type Request = {
  presetName: string;
  cardName: string;
};

// todo: change type
export const addPresetApi = async (data: Request) => 
  (await apiInstance().post<Response>(BACKEND_APIS.PRESETS, data)).data
