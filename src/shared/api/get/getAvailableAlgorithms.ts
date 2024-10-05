import { apiInstance } from "../api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  name: string;
}[];

export const getAvailableAlgorithmsApi = async () =>
  (await apiInstance().get(BACKEND_APIS.ALHORITHM)).data as Response[];