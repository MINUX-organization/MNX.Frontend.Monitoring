import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const startMiningApi = (rigId: string) =>
  apiInstance().post(`${BACKEND_APIS.RIGS}/${rigId}/mining/start`);