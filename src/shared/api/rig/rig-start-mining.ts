import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const rigStartMiningApi = (id: string) =>
  apiInstance().post(`${BACKEND_APIS.RIG.RIGS}/${id}/mining/start`);