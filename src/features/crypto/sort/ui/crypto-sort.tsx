import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { SortOption, UiSort } from "@/shared/ui/ui-sort";
import _ from "lodash";

export function CryptoSort({
  className 
} : { 
  className?: string;
}) {
  const { setCryptosList, getCryptosList } = useCryptoRepository();
  const keys = Object.keys(getCryptosList() ? getCryptosList()![0] : "").splice(1);
  const sortOptions: SortOption<Crypto>[] = _.map(keys, (key) => ({
    value: key as keyof Crypto,
    label: _.upperFirst(key) 
  }))
  return (
     <UiSort
      className={className}
      data={getCryptosList()} 
      sortOptions={sortOptions}
      onSort={(sortedData) => setCryptosList(sortedData)}
    /> 
  )
}
