import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const changePasswordApi = <T>(data: T) =>
  apiInstance().put(BACKEND_APIS.AUTH.CHANGE_PASSWORD, data);