import { cryptocurrencyRepository } from "@/entities/cryptocurrency"
import { poolQueryOptions, PoolType } from "@/entities/pool"
import { AddPoolButton, PoolForm, DeletePoolButton, EditPoolButton } from "@/features/pool"
import { MiningTable } from "@/widgets/mining-table"
import { useSuspenseQuery } from "@tanstack/react-query"
import _ from "lodash"

const { useCryptocurrencyQuery } = cryptocurrencyRepository;

export function PoolsPage() {
  const { data } = useSuspenseQuery(poolQueryOptions)
  const { cryptocurrencies } = useCryptocurrencyQuery()

  const poolsTable = _.map(data.data, (item) => ({
    id: item.id,
    domain: item.domain,
    port: item.port,
    cryptocurrency: item.cryptocurrency
  }))

  const actions = [
    (item: PoolType) => (
      <EditPoolButton renderPoolForm={(onClose) => 
        <PoolForm onClose={onClose} mode={'edit'} pool={item} cryptocurrencies={cryptocurrencies}/>
      }/>
    ),
    (item: PoolType) => (
      <DeletePoolButton id={item.id}/>
    ),
  ]

  return (
    <MiningTable 
      data={poolsTable} 
      actions={actions} 
      renderAddButton={() => 
        <AddPoolButton 
          renderPoolForm={(onClose) => <PoolForm onClose={onClose} mode={'add'} cryptocurrencies={cryptocurrencies}/>}
        />}
    />
  )
}