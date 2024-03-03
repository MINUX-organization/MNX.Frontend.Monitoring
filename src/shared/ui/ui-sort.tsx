import _ from 'lodash';
import { useCallback } from 'react';
import { UiSelect } from './ui-select';
import { useStateObject } from '../lib/utils/state-object';
import styles from './styles/uiSort.module.scss';


export type SortOption<T> = {
  value: keyof T;
  label: string;
};

function sortArray<T>(data: T[], sortBy: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return _.orderBy(data, [sortBy], [direction]);
}

export function UiSort<T>({
  data,
  onSort,
  sortOptions,
  initialSortBy,
  initialDirection
} : {
  data?: T[];
  onSort?: (sortedData: T[]) => void;
  sortOptions?: SortOption<T>[];
  initialSortBy?: keyof T;
  initialDirection?: 'asc' | 'desc';
}) {
  const selectedOption = useStateObject<SortOption<T> | undefined>()
  const sortBy = useStateObject<keyof T | undefined>(initialSortBy);
  const direction = useStateObject<'asc' | 'desc'>(initialDirection || 'asc');

  const handleSort = useCallback(() => {
    if (!sortBy.value) return;
    if (!data) return;

    const sortedData = sortArray(data, sortBy.value, direction.value);
    onSort?.(sortedData);
  }, [data, sortBy.value, direction.value, onSort]);

  const handleOnChange = (option?: SortOption<T>) => {
    sortBy.setValue(option?.value);
    selectedOption.setValue(option);
    handleSort();
  }

  const handleDirectionChange = () => {
    direction.setValue(direction.value === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={styles['sort']}>
      <UiSelect
        className={styles['sort-select']}
        options={sortOptions}
        getOptionLabel={(option) => option?.label}
        selectedValue={selectedOption.value}
        placeholder="Sort by"
        selectedOnChange={(option) => handleOnChange(option)}
        renderSelectedValue={(option) => option?.label}
      />
      <button onClick={handleDirectionChange}>
        {direction.value === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
}