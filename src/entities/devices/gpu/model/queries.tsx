import { getGpusListApi } from "@/shared/api/get/getGpusList";
import { useQuery } from "react-query";

export function useGpusListQuery() {
  return useQuery(['gpusList'], getGpusListApi);
}