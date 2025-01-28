import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

type Response = {
  accessToken: string,
  refreshToken: string,
  refreshExpiration: string
}

export const refreshAccessTokenApi = (refreshToken: string) => {
  return apiInstance().post<Response>(BACKEND_APIS.REFRESH_ACCESS_TOKEN, {refreshToken})
}