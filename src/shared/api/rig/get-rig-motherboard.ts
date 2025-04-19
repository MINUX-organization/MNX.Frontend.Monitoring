import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigMotherboardApi = <T>(id: string) => 
  apiInstance().get<T>(BACKEND_APIS.RIG.RIG_MOTHERBOARD(id));