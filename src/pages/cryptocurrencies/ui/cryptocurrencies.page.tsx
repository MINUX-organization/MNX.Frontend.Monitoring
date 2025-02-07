import { cryptocurrencyQueryOptions } from "@/entities/cryptocurrency";
import { DeleteCryptocurrencyButton } from "@/features/cryptocurrency";
import { MiningTable } from "@/widgets/mining-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import _ from "lodash";

export function CryptocurrenciesPage() {
  const { data } = useSuspenseQuery(cryptocurrencyQueryOptions)

  const cryptocurrenciesTable = _.map(data.data, (item) => ({
    id: item.id,
    shortName: item.shortName,
    fullName: item.fullName,
    algorithm: item.algorithm.name
  }))

  const actions = [
    (id: string) => (
      <DeleteCryptocurrencyButton id={id.toString()}/>
    )
  ]

  return (
    <MiningTable data={cryptocurrenciesTable} actions={actions}/>
  )
}