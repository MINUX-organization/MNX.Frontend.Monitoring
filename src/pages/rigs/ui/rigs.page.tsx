import { RigItem, rigsQueryOptions, RigType } from "@/entities/rig"
import { StartMiningButton, StopMiningButton } from "@/features/rig";
import { PowerOffButton, RebootButton } from "@/features/rig/buttons";
import { GenericList } from "@/widgets/generic-list";
import { useSuspenseQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table";

export function RigsPage() {
  const { data: rigs } = useSuspenseQuery(rigsQueryOptions);

  const columns: ColumnDef<RigType>[] = [
    { accessorKey: 'name', header: 'By Name' },
  ];

  const actions = [
    (item: RigType) => <StartMiningButton rigId={item.id} />,
    (item: RigType) => <StopMiningButton rigId={item.id} />,
    (item: RigType) => <RebootButton rigId={item.id} />,
    (item: RigType) => <PowerOffButton rigId={item.id} />,
  ]

  return (
    <GenericList
      data={rigs.data}
      columns={columns}
      sortable
      searchable
      renderItem={(item) => (
        <RigItem rig={item} actions={actions}/>
      )}
    />
  )
}