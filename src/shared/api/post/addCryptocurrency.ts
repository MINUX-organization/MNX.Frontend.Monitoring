import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../_api-instance";

interface Request {
  shortName: string;
  fullName: string;
  algorithm: string;
}

export const addCryptocurrency = (data: Request) => 
  apiInstance().post(BACKEND_APIS.CRYPTOCURRENCY, data);