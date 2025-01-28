import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editPasswordApi = (data: {newPassword: string, password: string, login: string}) => 
  apiInstance().put(BACKEND_APIS.CHANGE_PASSWORD, data);