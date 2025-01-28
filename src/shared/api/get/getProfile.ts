import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getProfileApi = () => 
  apiInstance().get(BACKEND_APIS.PROFILE);