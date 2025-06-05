import { algorithmQueryOptions, AlgorithmType } from "@/entities/algorithm";
import { AddAlgorithmButton, AlgorithmForm, DeleteAlgorithmButton, EditAlgorithmButton } from "@/features/algorithm";
import { MiningTable } from "@/widgets/mining-table";
import { useSuspenseQuery } from "@tanstack/react-query"
import { Outlet } from "@tanstack/react-router";
import map from "lodash/map";

export function AlgorithmsPage() {
  const { data } = useSuspenseQuery(algorithmQueryOptions);
  
  const algorithmsTabe = map(data.data, (item) => ({
    id: item.id,
    name: item.name,
    custom: item.ownerId ? true : false
  }))

  const actions = [
    ({ id, custom }: AlgorithmType & { custom: boolean }) => custom && <EditAlgorithmButton renderAlgorithmForm={(onClose) => <AlgorithmForm onClose={onClose} algorithmId={id}/>}/>,
    ({ id, custom }: AlgorithmType & { custom: boolean }) => custom && <DeleteAlgorithmButton id={id} />
  ]

  return (
    <>
      <MiningTable 
        data={algorithmsTabe}
        actions={actions}
        sortable
        searchable
        renderAddButton={() => <AddAlgorithmButton 
          renderAlgorithmForm={(onClose) => <AlgorithmForm onClose={onClose}/>}/>}
      />
      <Outlet />
    </>
  )
}