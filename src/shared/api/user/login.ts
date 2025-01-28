import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

type Response = {
  accessToken: string,
  refreshToken: string,
  refreshExpiration: string
}

export const loginApi = (data: { login: string, password: string }) => 
  apiInstance().post<Response>(BACKEND_APIS.AUTH.LOGIN, data);