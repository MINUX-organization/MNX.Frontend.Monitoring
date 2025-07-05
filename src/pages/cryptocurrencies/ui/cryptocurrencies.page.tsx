import { cryptocurrencyQueryOptions, CryptocurrencyType } from "@/entities/cryptocurrency";
import { AddCryptocurrencyButton, AddCryptocurrencyForm, DeleteCryptocurrencyButton } from "@/features/cryptocurrency";
import { MiningTable } from "@/widgets/mining-table";
import { Center, Spinner } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import map from "lodash/map";
import { Suspense } from "react";

export function CryptocurrenciesPage() {
  const { data } = useSuspenseQuery(cryptocurrencyQueryOptions)

  const cryptocurrenciesTable = map(data.data, (item) => ({
    id: item.id,
    shortName: item.shortName,
    fullName: item.fullName,
    algorithm: item.algorithm.name
  }))

  const actions = [
    ({ id }: CryptocurrencyType) => (
      <DeleteCryptocurrencyButton id={id.toString()}/>
    )
  ]

  return (
    <MiningTable 
      data={cryptocurrenciesTable} 
      actions={actions}
      sortable
      searchable
      renderAddButton={() => 
        <AddCryptocurrencyButton 
          renderCryptocurrencyForm={(onClose) => 
            <Suspense fallback={<Center><Spinner /></Center>}>
              <AddCryptocurrencyForm onClose={onClose}/>
            </Suspense>}
        />}
    />
  )
}