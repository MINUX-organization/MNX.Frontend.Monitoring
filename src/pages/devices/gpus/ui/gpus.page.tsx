import { devicesStreamStore, GpuItem, gpusQueryOptions, GpuType } from "@/entities/devices";
import { GpuConfigButton } from "@/features/devices";
import { UiTooltip } from "@/shared/ui";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export function GpusPage() {
  const { data: gpus } = useSuspenseQuery(gpusQueryOptions);
  const { gpuDynamicTotalIndicators } = devicesStreamStore();

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
            gpuDynamic={gpuDynamicTotalIndicators.get(item.id)}
            renderGpuSetting={(gpuId) => <UiTooltip content='Overclocking config'> <GpuConfigButton gpuId={gpuId} /> </UiTooltip>} 
          />
        )}
      />
      <Outlet />
    </>
  )
}