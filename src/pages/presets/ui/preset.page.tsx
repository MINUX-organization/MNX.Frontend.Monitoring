import { presetQueryOptions, PresetType } from "@/entities/preset";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export function PresetPage() {
  const { data } = useSuspenseQuery(presetQueryOptions)

  const presetsColumns: ColumnDef<PresetType>[] = [
    { accessorKey: 'name', header: 'By GPU Name' },
  ]

  return (
    <GenericList 
      data={data.data}
      columns={presetsColumns}
      sortable
      searchable
    />
  )
}