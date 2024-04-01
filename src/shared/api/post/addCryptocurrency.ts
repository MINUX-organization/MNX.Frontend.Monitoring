import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance"; 

type Request = {
  shortName: string;
  fullName: string;
  algorithm: string;
};

type Response = Request;

export const addCryptocurrencyApi = async (data: Request) => 
  (await apiInstance().post(BACKEND_APIS.CRYPTOCURRENCY, data)).data as Response;