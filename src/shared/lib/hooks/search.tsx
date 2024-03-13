import { useEffect } from "react";
import { useStateObject } from "../utils/state-object";
import _ from "lodash";
import { filterByAll } from "../utils/filter-by-all"; 

export function useSearch<T>(
  getItems: () => T[] | undefined,
  setItems: (items: T[] | undefined) => void,
  isLoading: boolean
) {
  const filteredItems = useStateObject<T[]>([]);
  const itemsSource = useStateObject<T[]>([]);
  const itemSeacrh = useStateObject<string | undefined>('');

  const items = getItems() || [];

  useEffect(() => {
    if (isLoading) return;
    if (!items) return;

    filteredItems.setValue(items);
    itemsSource.setValue(items);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (!items || !itemsSource.value || !filteredItems.value) return;
    if (itemsSource.value.length === 0) return;
    if (filteredItems.value.length === items.length) return;

    if (items.length > filteredItems.value.length) {
      const addedItem = _.differenceWith(items, filteredItems.value, _.isEqual)[0];

      if (!addedItem) return; 

      itemsSource.setValue((prev) => [...prev!, addedItem]);
    } else {
      const deletedItem = _.differenceWith(filteredItems.value, items, _.isEqual)[0];

      if (!deletedItem) return; 

      itemsSource.setValue((prev) => _.remove(prev!, (item) => _.isEqual(item, deletedItem)));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getItems()?.length]);

  useEffect(() => {
    if (itemsSource.value?.length === 0) return;
    handleOnchange(itemSeacrh.value);
    
    return () => {
      setItems(itemsSource.value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSource.value?.length])

  const handleOnchange = (value?: string) => {
    itemSeacrh.setValue(value);

    if (value === '' || !value) {
      if (_.isEqual(itemsSource.value, filteredItems.value)) {
        return;
      }

      filteredItems.setValue(itemsSource.value);
      setItems(itemsSource.value);
      
      return;
    }

    const filtered: T[] = filterByAll(itemsSource.value, value!);

    if (_.isEqual(filtered, filteredItems.value)) return;

    filteredItems.setValue(filtered);
    setItems(filtered);
  }

  return {
    handleOnchange,
  };
}