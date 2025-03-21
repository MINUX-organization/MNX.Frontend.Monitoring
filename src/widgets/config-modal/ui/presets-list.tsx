import { PresetItem, presetsByDeviceNameQueryOptions, PresetType } from "@/entities/preset";
import { ApplyPresetButton, DeletePresetButton, EditPresetButton } from "@/features/preset";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export function PresetsList({ deviceName }: { deviceName: string }) {
  const { data: presets } = useSuspenseQuery(presetsByDeviceNameQueryOptions(deviceName));

  const columns: ColumnDef<PresetType>[] = [
    { accessorKey: 'name', header: 'By Name' },
  ];

  const actions = [
    (item: PresetType) => (
      <ApplyPresetButton presetId={item.id} type="action"/>
    ),
    (item: PresetType) => (
      <EditPresetButton presetId={item.id} deviceName={item.deviceName} type="action"/>
    ),
    (item: PresetType) => (
      <DeletePresetButton presetId={item.id} />
    ),
  ]

  return (
    <GenericList
      data={presets.data}
      columns={columns}
      searchable
      sortable
      renderItem={(item) => (
        <PresetItem type="card" preset={item} actions={actions}/>
      )}
    />
  )
}