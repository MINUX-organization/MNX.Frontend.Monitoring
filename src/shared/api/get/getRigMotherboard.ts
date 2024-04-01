import { apiInstance } from "../api-instance";

export const getRigMotherboardApi = async (rigId?: string) => 
  (await apiInstance().get(`/rigs/${rigId}/motherboard`)).data 