import { getAvailableMinersApi } from "@/shared/api/get/getAvailableMiners";
import { useQuery } from "react-query";

export function useMinerRepository() {
  const { data, ...query } = useQuery(['minersList'], () => getAvailableMinersApi())

  return {
    minersList: data,
    ...query
  }
}