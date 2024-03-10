import _ from "lodash";

export function filterByAll<T>(collection: T[] | undefined, searchText: string) {
  if (!collection) return [];
  const keys = _.keys(collection[0]);
  return _.filter(collection, (item) => {
    return keys.some(key => 
      _.toString(_.get(item, key)).toLowerCase().includes(searchText.toLowerCase()));
  });
}
