import { MeasureUnit } from "@/shared/types/measure-unit";
import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

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

// todo: change type
export const getPresetsListApi = async () =>
  (await apiInstance().get(BACKEND_APIS.PRESETS)).data as Response[];