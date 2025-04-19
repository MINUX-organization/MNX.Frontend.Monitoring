import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigsApi = <T>() => 
  apiInstance().get<T>(BACKEND_APIS.RIG.RIGS)