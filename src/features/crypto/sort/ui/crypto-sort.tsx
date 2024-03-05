import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { SortOption, UiSort } from "@/shared/ui/ui-sort";

export function CryptoSort({
  className 
} : { 
  className?: string;
}) {
  const { setCryptosList, getCryptosList } = useCryptoRepository();
  const sortOptions: SortOption<Crypto>[] = [
    { value: 'shortName', label: 'Short Name' },
    { value: 'fullName', label: 'Full Name' },
    { value: 'algorithm', label: 'Algorithm' },
  ];
  
  return (
     <UiSort
      className={className}
      data={getCryptosList()} 
      sortOptions={sortOptions}
      onSort={(sortedData) => setCryptosList(sortedData)}
    /> 
  )
}
