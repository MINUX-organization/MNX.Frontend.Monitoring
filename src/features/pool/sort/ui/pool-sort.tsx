import { SortOption, UiSort } from "@/shared/ui/ui-sort";
import styles from './poolSort.module.scss';
import clsx from "clsx";
import { Pool, usePoolRepository } from "@/entities/pool";

export function PoolSort({
  className 
} : { 
  className?: string;
}) {
  const { setPoolsList, getPoolsList } = usePoolRepository();
  const poolsList = getPoolsList();

  const sortOptions: SortOption<Pool>[] = [
    { value: "name" as keyof Pool, label: "Short Name" },
    { value: "cryptocurrency" as keyof Pool, label: "Coin" },
    { value: "address" as keyof Pool, label: "Address" }
  ]

  return (
    <UiSort
      className={clsx(className, styles['pool-sort'])}
      data={poolsList} 
      sortOptions={sortOptions}
      onSort={(sortedData) => setPoolsList(sortedData)}
    /> 
  )
}
