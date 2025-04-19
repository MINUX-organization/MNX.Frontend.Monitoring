import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const rigPowerOffApi = (id: string) =>
  apiInstance().post(`${BACKEND_APIS.RIG.RIGS}/${id}/power_off`);