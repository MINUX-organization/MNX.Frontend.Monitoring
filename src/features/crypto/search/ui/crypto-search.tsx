import { UiSearch } from "@/shared/ui/ui-search";
import styles from "./cryptoSearch.module.scss"; 
import clsx from "clsx";
import { useSearch } from "@/shared/lib/hooks/search";
import { useCryptoRepository } from "@/entities/crypto";

export function CryptoSearch({ 
  className 
} : { 
  className?: string 
}) {
  const { getCryptosList, setCryptosList, isLoading } = useCryptoRepository();
  const { handleOnchange } = useSearch(getCryptosList, setCryptosList, isLoading);

  return (
    <UiSearch
      className={clsx(className, styles['crypto-search'])}
      onChange={handleOnchange}
      placeholder="Search"
    />
  )
}