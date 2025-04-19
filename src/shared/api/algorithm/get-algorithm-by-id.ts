import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getAlgorithmByIdApi = <T>(id: string) =>
  apiInstance().get<T>(`${BACKEND_APIS.ALHORITHMS.BASE}/${id}`);