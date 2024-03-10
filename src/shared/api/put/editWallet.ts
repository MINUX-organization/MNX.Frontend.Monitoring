import { apiInstance } from "../_api-instance";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

type Response = {
  name: string;
  address: string;
  cryptocurrency: string;
}

type Request = Response;

export const editWallet = async (data: Request, id: string) => 
  (await apiInstance().put(`${BACKEND_APIS.WALLET}/${id}`, data)).data as Response[];