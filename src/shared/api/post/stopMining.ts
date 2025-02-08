import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const stopMiningApi = (rigId: string) =>
  apiInstance().post(`${BACKEND_APIS.RIGS}/${rigId}/mining/stop`);