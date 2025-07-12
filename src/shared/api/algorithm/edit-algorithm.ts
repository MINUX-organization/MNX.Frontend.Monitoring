import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editAlgorithmApi = <T>(id: string, data: T) =>
  apiInstance().put(`${BACKEND_APIS.ALHORITHMS.BASE}/${id}`, data);