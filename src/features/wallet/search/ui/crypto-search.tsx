import { UiSearch } from "@/shared/ui/ui-search";
import styles from "./cryptoSearch.module.scss"; 
import clsx from "clsx";
import { useCryptoSearch } from "../hooks/use-crypto-search";

export function CryptoSearch({ 
  className 
} : { 
  className?: string 
}) {
  const { handleOnchange } = useCryptoSearch();

  return (
    <UiSearch
      className={clsx(className, styles['crypto-search'])}
      onChange={handleOnchange}
      placeholder="Search"
    />
  )
}