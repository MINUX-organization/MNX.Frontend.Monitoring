import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const registrationApi = (data: {login: string, password: string}) => 
  apiInstance().post(BACKEND_APIS.AUTH.SIGNUP, data);