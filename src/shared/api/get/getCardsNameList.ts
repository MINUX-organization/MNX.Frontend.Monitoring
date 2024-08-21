import { apiInstance } from "../api-instance";

type Response = string[]
// todo: change type
export const getCardsNameList = async () =>
  (await apiInstance().get("/cards")).data as Response[];