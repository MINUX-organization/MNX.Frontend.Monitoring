import { getGpusListApi } from "@/shared/api/get/getGpusList";
import { useQuery } from "react-query";
import { DeviceGpuInfo } from "./types";
import { getDeviceOverclocking } from "@/shared/api/get/getDeviceOverclocking";
import { Overclocking } from "@/entities/preset";

export function useGpusListQuery() {
  const { data, ...query } = useQuery(['gpusList'], getGpusListApi<DeviceGpuInfo[]>);

  return {
    data: data?.data,
    ...query
  }
}

export function useGpuOverclockingQuery(deviceId: string) {
  const { data, ...query } = useQuery(['overclocking'], () => getDeviceOverclocking<Overclocking>(deviceId));

  return {
    data: data?.data,
    ...query
  }
}