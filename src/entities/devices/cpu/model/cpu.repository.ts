import { queryOptions } from "@tanstack/react-query";
import { CpuType } from "./cpu.type";
import { getCpuDevices } from "@/shared/api";

export const cpusQueryOptions = queryOptions({
  queryKey: ['cpus'],
  queryFn: () => getCpuDevices<CpuType[]>(),
  staleTime: 5000,
});