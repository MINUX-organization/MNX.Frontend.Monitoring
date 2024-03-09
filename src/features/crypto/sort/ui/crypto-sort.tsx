import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { SortOption, UiSort } from "@/shared/ui/ui-sort";
import styles from './cryptoSort.module.scss';
import clsx from "clsx";

export function CryptoSort({
  className 
} : { 
  className?: string;
}) {
  const { setCryptosList, getCryptosList } = useCryptoRepository();

  const cryptosList = getCryptosList();

  const sortOptions: SortOption<Crypto>[] = [
    { value: "shortName" as keyof Crypto, label: "Short Name" },
    { value: "fullName" as keyof Crypto, label: "Full Name" },
    { value: "algorithm" as keyof Crypto, label: "Algorithm" }
  ]

  return (
    <UiSort
      className={clsx(className, styles['crypto-sort'])}
      data={cryptosList} 
      sortOptions={sortOptions}
      onSort={(sortedData) => setCryptosList(sortedData)}
    /> 
  )
}
