import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

type Response = {
  accessToken: string,
  refreshToken: string,
  refreshExpiration: string
}

export const refreshTokensApi = (refreshToken: string) => 
  apiInstance().post<Response>(BACKEND_APIS.AUTH.REFRESH_TOKENS, { refreshToken });