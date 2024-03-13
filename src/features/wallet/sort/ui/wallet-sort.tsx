import { SortOption, UiSort } from "@/shared/ui/ui-sort";
import styles from './walletSort.module.scss';
import clsx from "clsx";
import { Wallet, useWalletRepository } from "@/entities/wallet";

export function WalletSort({
  className 
} : { 
  className?: string;
}) {
  const { setWalletsList, getWalletsList } = useWalletRepository();
  const walletsList = getWalletsList();

  const sortOptions: SortOption<Wallet>[] = [
    { value: "name" as keyof Wallet, label: "Short Name" },
    { value: "cryptocurrency" as keyof Wallet, label: "Coin" },
    { value: "address" as keyof Wallet, label: "Address" }
  ]

  return (
    <UiSort
      className={clsx(className, styles['wallet-sort'])}
      data={walletsList} 
      sortOptions={sortOptions}
      onSort={(sortedData) => setWalletsList(sortedData)}
    /> 
  )
}
