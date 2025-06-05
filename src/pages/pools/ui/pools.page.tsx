import { cryptocurrencyRepository } from "@/entities/cryptocurrency"
import { poolQueryOptions, PoolType } from "@/entities/pool"
import { AddPoolButton, PoolForm, DeletePoolButton, EditPoolButton } from "@/features/pool"
import { MiningTable } from "@/widgets/mining-table"
import { useSuspenseQuery } from "@tanstack/react-query"
import map from "lodash/map"

const { useCryptocurrencyQuery } = cryptocurrencyRepository;

export function PoolsPage() {
  const { data } = useSuspenseQuery(poolQueryOptions)
  const { cryptocurrencies } = useCryptocurrencyQuery()

  const poolsMap = new Map<string, PoolType>();

  const poolsTable = map(data.data, (item) => {
    poolsMap.set(item.id, item);

    return {
      id: item.id,
      domain: item.domain,
      port: item.port,
      cryptocurrency: item.cryptocurrency,
      custom: item.userId ? true : false,
      tls: item.tls
    }
  })

  const actions = [
    (item: PoolType & { custom: boolean }) => (
      item.custom && <EditPoolButton renderPoolForm={(onClose) => 
        <PoolForm onClose={onClose} mode={'edit'} pool={poolsMap.get(item.id)} cryptocurrencies={cryptocurrencies}/>
      }/>
    ),
    (item: PoolType & { custom: boolean }) => (
      item.custom && <DeletePoolButton id={item.id}/>
    ),
  ]

  return (
    <MiningTable 
      data={poolsTable} 
      actions={actions}
      searchable
      sortable
      renderAddButton={() => 
        <AddPoolButton 
          renderPoolForm={(onClose) => <PoolForm onClose={onClose} mode={'add'} cryptocurrencies={cryptocurrencies}/>}
        />}
    />
  )
}