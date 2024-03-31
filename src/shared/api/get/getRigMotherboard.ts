import { apiInstance } from "../_api-instance";

export const getRigMotherboardApi = async (rigId?: string) => 
  (await apiInstance().get(`/rigs/${rigId}/motherboard`)).data 