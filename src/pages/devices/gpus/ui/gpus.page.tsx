import { GpuItem, gpusQueryOptions, GpuType } from "@/entities/devices";
import { GpuConfigButton } from "@/features/devices";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { useDevicesStream } from "../../hooks/devices-stream";
import _ from "lodash";
import { useMemo } from "react";

export function GpusPage() {
  const data = useDevicesStream();
  const { data: gpus } = useSuspenseQuery(gpusQueryOptions);

  const dynamicDevices = useMemo(
    () => _.reduce(data?.gpuDynamicTotalIndicators, (acc, item) => {
        acc.set(item.deviceId, item);
        return acc;
    }, new Map()),
    [data],
  );

  const columns: ColumnDef<GpuType>[] = [
    { accessorKey: 'information.name', header: 'By Name' },
  ];

  return (
    <>
      <GenericList
        data={gpus.data}
        columns={columns}
        searchable
        sortable
        renderItem={(item) => (
          <GpuItem 
            minH={'8rem'}
            gpu={item}
            gpuDynamic={dynamicDevices.get(item.id)}
            renderGpuSetting={(gpuId) => <GpuConfigButton gpuId={gpuId} />} 
          />
        )}
      />
      <Outlet />
    </>
  )
}