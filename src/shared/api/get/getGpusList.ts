import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getGpusListApi = async <T>() => 
  apiInstance().get<T>(`${BACKEND_APIS.GPUS}`);