import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getAvailableMinersApi = async () => 
  await (await apiInstance().get(BACKEND_APIS.MINERS)).data