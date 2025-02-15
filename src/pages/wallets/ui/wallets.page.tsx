import { cryptocurrencyRepository } from "@/entities/cryptocurrency";
import { WalletType, walletQueryOptions } from "@/entities/wallet";
import { AddWalletButton, DeleteWalletButton, EditWalletButton, WalletForm } from "@/features/wallet";
import { MiningTable } from "@/widgets/mining-table";
import { useSuspenseQuery } from "@tanstack/react-query"
import _ from "lodash"

const { useCryptocurrencyQuery } = cryptocurrencyRepository;

export function WalletsPage() {
  const { data } = useSuspenseQuery(walletQueryOptions)
  const { cryptocurrencies } = useCryptocurrencyQuery()

  const walletsTable = _.map(data.data, (item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    cryptocurrency: item.cryptocurrency,
  }))

  const actions = [
    (item: WalletType) => (
      <EditWalletButton renderPoolForm={(onClose) => 
        <WalletForm onClose={onClose} mode={'edit'} wallet={item} cryptocurrencies={cryptocurrencies}/>
      }/>
    ),
    (item: WalletType) => (
      <DeleteWalletButton id={item.id}/>
    ),
  ]

  return (
    <MiningTable 
      data={walletsTable} 
      actions={actions} 
      renderAddButton={() => 
        <AddWalletButton 
          renderPoolForm={(onClose) => <WalletForm onClose={onClose} mode={'add'} cryptocurrencies={cryptocurrencies}/>}
        />}
    />
  )
}