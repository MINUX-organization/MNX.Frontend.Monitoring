import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getCpusListApi = () => 
  apiInstance().get(BACKEND_APIS.CPUS);