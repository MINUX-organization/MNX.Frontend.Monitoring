import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const editNicknameApi = <T>(data: T) => 
  apiInstance().patch(BACKEND_APIS.PROFILE.NICKNAME, data);