import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const deleteAlgorithmApi = (id: string) =>
  apiInstance().delete(`${BACKEND_APIS.ALHORITHMS.BASE}/${id}`);