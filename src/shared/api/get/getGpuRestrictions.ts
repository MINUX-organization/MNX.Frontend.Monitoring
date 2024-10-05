import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

type Restrictions = {
  minimal: number;
  maximal: number;
  isWritable: boolean;
  default: number;
}

export type GpuRestrictionsResponse = {
  power: Restrictions;
  fanSpeed: Restrictions;
  temperature: {
    core: Restrictions;
    memory: Restrictions;
  };
  voltage: {
    core: {
      lock: Restrictions;
      offset: Restrictions;
    };
    memory: {
      lock: Restrictions;
      offset: Restrictions;
    };
  };
  clock: {
    core: {
      lock: Restrictions;
      offset: Restrictions;
    };
    memory: {
      lock: Restrictions;
      offset: Restrictions;
    };
  };
};

export const getGpuRestrictions = async (gpuName: string) =>
  (await apiInstance().get(BACKEND_APIS.GPUS_RESTRICTIONS(gpuName))).data as GpuRestrictionsResponse;