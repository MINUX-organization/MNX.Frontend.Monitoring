import { PresetGroupedByGpuItem, presetGroupedByGpuQueryOptions, PresetGroupedByGpuType, PresetType } from "@/entities/preset";
import { AddPresetButton, ApplyPresetButton, DeletePresetButton, EditPresetButton } from "@/features/preset";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export function PresetsPage() {
  const { data } = useSuspenseQuery(presetGroupedByGpuQueryOptions);

  const presetsColumns: ColumnDef<PresetGroupedByGpuType>[] = [
    { accessorKey: 'name', header: 'By GPU Name' },
  ];

  const actions = [
    (item: PresetType) => <ApplyPresetButton presetId={item.id} />,
    (item: PresetType) => <EditPresetButton presetId={item.id} />,
    (item: PresetType) => <DeletePresetButton presetId={item.id} />,
  ];

  return (
    <>
      <GenericList 
        data={data.data}
        columns={presetsColumns}
        sortable
        searchable
        customGlobalFilterFn={(row, _, filterValue) => {
          const search = filterValue.toLowerCase()

          const nameMatch = row.original.name.toLowerCase().includes(search)
          
          const presetsMatch = row.original.presets?.some(preset => 
            preset.name.toLowerCase().includes(search)
          )

          return presetsMatch || nameMatch
        }}
        renderAddButton={() => <AddPresetButton />}
        renderItem={(item) => <PresetGroupedByGpuItem presetGroupedByGpu={item} actions={actions}/>}
      />
      <Outlet />
    </>
  )
}