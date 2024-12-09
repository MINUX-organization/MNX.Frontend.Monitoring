import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

interface Response {
  accessToken: string;
  refreshToken: string;
  refreshExpiration: string;
}

export const registrationApi = async (login: string, password: string) => 
  (await apiInstance().post(BACKEND_APIS.SIGNUP, {login, password})).data as Response;