import { getRigsListApi } from "@/shared/api/get/getRigsList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useQuery } from "react-query";
import { RigTotal } from "./types";

export function useRigsQuery() {
  const { data, ...query } = useQuery(['rigsList'], () => getRigsListApi())

  const rigsList = ZodSaveParse(data, RigTotal.array().optional())

  return {
    rigsList,
    ...query
  }
}