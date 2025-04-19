import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const registrationApi = <T, U>(data: T) => 
  apiInstance().post<U>(BACKEND_APIS.AUTH.SIGNUP, data);