import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigCpusListApi = async (rigId?: string) =>
  (await apiInstance().get<Response>(`${BACKEND_APIS.RIGS}/${rigId}/cpus`)).data