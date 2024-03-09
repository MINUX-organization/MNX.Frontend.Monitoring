import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { UiSelect } from './ui-select';
import { useStateObject } from '../lib/utils/state-object';
import styles from './styles/uiSort.module.scss';
import clsx from 'clsx';
import { ArrowDownAZ, ArrowDownZA } from 'lucide-react';


export type SortOption<T> = {
  value: keyof T;
  label: string;
};

function sortArray<T>(data: T[], sortBy?: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  if (!sortBy) return data;
  return _.orderBy(data, [sortBy], [direction]);
}

export function UiSort<T>({
  data,
  onSort,
  className,
  sortOptions,
  initialSortBy,
  initialDirection
} : {
  data?: T[];
  className?: string;
  initialSortBy?: keyof T;
  sortOptions?: SortOption<T>[];
  initialDirection?: 'asc' | 'desc';
  onSort?: (sortedData: T[]) => void;
}) {
  const selectedOption = useStateObject<SortOption<T> | undefined>()
  const sortBy = useStateObject<keyof T | undefined>(initialSortBy);
  const direction = useStateObject<'asc' | 'desc'>(initialDirection || 'asc');
  
  const handleSort = useCallback((option?: SortOption<T>) => {
    if (!data) return;

    const newSortBy = option?.value || sortBy.value; 
    const sortedData = sortArray(data, newSortBy, direction.value); 
    onSort?.(sortedData);
    if (!option) return;
    sortBy.setValue(newSortBy);
    selectedOption.setValue(option);
  }, [data, sortBy, direction.value, onSort, selectedOption]);

  useEffect(() => {
    handleSort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length, direction.value]);

  const handleDirectionChange = () => {
    direction.setValue(direction.value === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={clsx(
      className,
      styles['sort']
    )}>
      <UiSelect
        className={styles['sort-select']}
        options={sortOptions}
        getOptionLabel={(option) => option?.label}
        selectedValue={selectedOption.value}
        placeholder="Sort by"
        selectedOnChange={(option) => handleSort(option)}
        renderSelectedValue={(option) => option?.label}
      />
      <button className={styles['sort-direction']} onClick={handleDirectionChange}>
        {direction.value === 'asc' ? <ArrowDownAZ size={24}/> : <ArrowDownZA size={24}/>}
      </button>   
    </div>
  );
}