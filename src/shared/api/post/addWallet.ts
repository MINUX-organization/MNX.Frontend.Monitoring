import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  name: string;
  address: string;
  cryptocurrency: string;
}

type Request = Response;

export const addWalletApi = async (data: Request) => 
  (await apiInstance().post(BACKEND_APIS.WALLET, data)).data as Response[];