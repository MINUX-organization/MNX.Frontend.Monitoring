import { UiSearch } from "@/shared/ui/ui-search";
import styles from "./poolSearch.module.scss"; 
import clsx from "clsx";
import { useSearch } from "@/shared/lib/hooks/search";
import { usePoolRepository } from "@/entities/pool";

export function PoolSearch({ 
  className 
} : { 
  className?: string 
}) {
  const { getPoolsList, setPoolsList, isLoading } = usePoolRepository();
  const { handleOnchange } = useSearch(getPoolsList, setPoolsList, isLoading);

  return (
    <UiSearch
      className={clsx(className, styles['pool-search'])}
      onChange={handleOnchange}
      placeholder="Search"
    />
  )
}