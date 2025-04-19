import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const loginApi = <T, U>(data: T) => 
  apiInstance().post<U>(BACKEND_APIS.AUTH.LOGIN, data);