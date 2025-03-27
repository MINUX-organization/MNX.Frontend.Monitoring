import { CpuItem, cpusQueryOptions, CpuType, devicesStreamStore } from "@/entities/devices";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export function CpusPage() {
  const { data: gpus } = useSuspenseQuery(cpusQueryOptions);
  const { cpuDynamicTotalIndicators } = devicesStreamStore();

  const columns: ColumnDef<CpuType>[] = [
    { accessorKey: 'information.name', header: 'By Name' },
  ];
  console.log(cpuDynamicTotalIndicators)
  return (
    <>
      <GenericList
        data={gpus.data}
        columns={columns}
        searchable
        sortable
        renderItem={(item) => (
          <CpuItem 
            minH={'8rem'}
            cpu={item}
            cpuDynamic={cpuDynamicTotalIndicators.get(item.id)}
          />
        )}
      />
    </>
  )
}