import { getCpusListApi } from "@/shared/api/get/getCpusList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useQuery } from "react-query";
import { Cpu } from "./types";

export function useCpusListQuery() {
  const { data, ...query } = useQuery(['cpusList'], getCpusListApi);

  const cpusList = ZodSaveParse(data?.data, Cpu.array().optional())

  return {
    data: cpusList,
    ...query
  }
}