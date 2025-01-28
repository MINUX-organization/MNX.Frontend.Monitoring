import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editNicknameApi = (nickname: string) => 
  apiInstance().patch(BACKEND_APIS.NICKNAME, {nickname});