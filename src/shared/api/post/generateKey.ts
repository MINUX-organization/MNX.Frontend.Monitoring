import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const generateKeyApi = () =>
  apiInstance().post(BACKEND_APIS.GENERATE_KEY);