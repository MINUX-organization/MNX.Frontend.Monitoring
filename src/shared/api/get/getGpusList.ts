import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export type Response = {
  id: string;
  name: string;
}

export const getGpusListApi: () => Promise<Response[]> = async () => 
  (await apiInstance().get(`${BACKEND_APIS.GPUS}`)).data as Response[];