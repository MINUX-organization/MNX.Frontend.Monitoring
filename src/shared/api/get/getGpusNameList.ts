import { BACKEND_APIS } from "@/shared/constants/backend-urls";
import { apiInstance } from "../api-instance";

type Response = string[]
// todo: change type
export const getCardsNameList = async () =>
  (await apiInstance().get(BACKEND_APIS.GPUS_UNIQUE_NAMES)).data as Response[];