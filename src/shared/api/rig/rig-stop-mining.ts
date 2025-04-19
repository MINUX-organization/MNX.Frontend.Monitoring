import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const rigStopMiningApi = (id: string) =>
  apiInstance().post(`${BACKEND_APIS.RIG.RIGS}/${id}/mining/stop`);