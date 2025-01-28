import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigDrivesApi = <T>(id: string) => 
  apiInstance().get<T>(BACKEND_APIS.RIG.RIG_DRIVES(id));