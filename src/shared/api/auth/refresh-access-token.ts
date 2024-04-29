import { BACKEND_APIS } from "@/shared/constants/backend-urls"
import { apiInstance } from "./_api-instance"

export const refreshAccessTokenApi = async (refreshToken: string) => {
  return (await apiInstance().post(BACKEND_APIS.REFRESH_ACCESS_TOKEN, {refreshToken})).data
}