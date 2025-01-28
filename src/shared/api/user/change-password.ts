import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const changePasswordApi = (data: { oldPassword: string, newPassword: string }) =>
  apiInstance().post(BACKEND_APIS.AUTH.CHANGE_PASSWORD, data);