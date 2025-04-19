import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getMinersApi = <T>() => 
  apiInstance().get<T>(BACKEND_APIS.MINERS);