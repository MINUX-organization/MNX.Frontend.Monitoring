import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = string[]

export const getAvailableAlgorithms = async () =>
  (await apiInstance().get(BACKEND_APIS.ALHORITHM)).data as Response[];