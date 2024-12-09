import { useQuery } from "react-query";
import { RigDevices } from "./types";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { getRigDevicesSupportedApi } from "@/shared/api/get/getRigDevices";

export function useRigDevicesQuery(flightSheetId?: string) {
  const { data, ...query } = useQuery(['rigDevices'], () => getRigDevicesSupportedApi(flightSheetId!), {
    enabled: !!flightSheetId
  })

  return {
    rigDevices: ZodSaveParse(data?.data, RigDevices.array().optional()),
    ...query
  }
}