import { getFlightSheetById } from "@/shared/api/get/getFlightSheetById";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useQuery } from "react-query";
import { FlightSheet } from "./types";

export function useFlightSheetByIdQuery(flightSheetId?: string) {
  const { data, ...query } = useQuery(['flightSheetById', flightSheetId], () => getFlightSheetById(flightSheetId!), {
    enabled: !!flightSheetId
  })

  return {
    flightSheet: ZodSaveParse(data, FlightSheet.optional()),
    ...query
  }
}