import { BACKEND_APIS } from "@/shared/constants/backend-urls"
import axios from "axios"

export const refreshAccessTokenApi = async (refreshToken: string) => {
  return (await axios.post(BACKEND_APIS.REFRESH_ACCESS_TOKEN, {refreshToken})).data
}