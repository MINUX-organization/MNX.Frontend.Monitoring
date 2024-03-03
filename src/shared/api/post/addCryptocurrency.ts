import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance"; 

type Request = {
  shortName: string;
  fullName: string;
  algorithmName: string;
};

type Response = Request;

export const addCryptocurrency = async (data: Request) => 
  (await apiInstance().post(BACKEND_APIS.CRYPTOCURRENCY, data)).data as Response;