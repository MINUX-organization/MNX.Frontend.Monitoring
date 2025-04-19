import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getProfileApi = <T>() => 
  apiInstance().get<T>(BACKEND_APIS.PROFILE.BASE);