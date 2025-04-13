import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const addAlgorithmApi = <T>(data: T) =>
  apiInstance().post(BACKEND_APIS.ALHORITHMS.BASE, data);