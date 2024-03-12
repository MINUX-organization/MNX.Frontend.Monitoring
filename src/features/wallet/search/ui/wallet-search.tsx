import { UiSearch } from "@/shared/ui/ui-search";
import styles from "./walletSearch.module.scss"; 
import clsx from "clsx";
import { useSearch } from "@/shared/lib/hooks/search";
import { useWalletRepository } from "@/entities/wallet";

export function WalletSearch({ 
  className 
} : { 
  className?: string 
}) {
  const { getWalletsList, setWalletsList, isLoading } = useWalletRepository();
  const { handleOnchange } = useSearch(getWalletsList, setWalletsList, isLoading);

  return (
    <UiSearch
      className={clsx(className, styles['wallet-search'])}
      onChange={handleOnchange}
      placeholder="Search"
    />
  )
}