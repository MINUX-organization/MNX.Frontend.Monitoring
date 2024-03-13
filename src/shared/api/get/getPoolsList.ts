import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

type Response = {
  id: string;
  domain: string;
  port: number;
  cryptocurrency: string;
};

export const getPoolsListApi = async () => 
  (await apiInstance().get(BACKEND_APIS.POOL)).data as Response[]