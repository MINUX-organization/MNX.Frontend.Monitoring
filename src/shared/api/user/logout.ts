import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const logoutApi = (refreshToken: string) => 
  apiInstance().put(BACKEND_APIS.AUTH.LOGOUT, { refreshToken });