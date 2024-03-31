import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

export const getRigGpusApi = async (rigId?: string) =>
  (await apiInstance().get(`${BACKEND_APIS.RIGS}/${rigId}/gpus`)).data