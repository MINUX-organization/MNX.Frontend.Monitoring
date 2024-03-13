import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  name: string;
  address: string;
  cryptocurrency: string;
};

type Request = {
  name: string;
  address: string;
  cryptocurrencyId: string;
}

export const addWalletApi = async (data: Request) => 
  (await apiInstance().post(BACKEND_APIS.WALLET, data)).data as Response[];