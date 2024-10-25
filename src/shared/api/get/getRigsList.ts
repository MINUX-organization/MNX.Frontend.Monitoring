import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

export const getRigsListApi = async () =>
  (await apiInstance().get(BACKEND_APIS.RIGS)).data