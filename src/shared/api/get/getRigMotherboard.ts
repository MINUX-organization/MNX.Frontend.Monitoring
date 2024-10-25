import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigMotherboardApi = async (rigId?: string) => 
  (await apiInstance().get(`${BACKEND_APIS.RIGS}/${rigId}/motherboard`)).data 