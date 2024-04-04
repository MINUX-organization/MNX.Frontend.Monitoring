import { BACKEND_APIS, BACKEND_URL } from "@/shared/constants/backend-urls";
import axios from "axios";

export const loginApi = async (login: string, password: string) => 
  (await axios.post(`${BACKEND_URL}${BACKEND_APIS.LOGIN}`, {login, password})).data;