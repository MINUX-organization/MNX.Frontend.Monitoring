import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  id: string;
  name: string;
  address: string;
  cryptocurrency: string;
}

type Request = {
  name: string;
  address: string;
  cryptocurrencyId: string;
};

export const editWalletApi = async (id: string, data: Request) => 
  (await apiInstance().put(`${BACKEND_APIS.WALLET}/${id}`, data)).data as Response;