import { SortDirection } from "@tanstack/react-table";
import { FaSort, FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { match } from "ts-pattern";

export function SortingIcon({ state }: {state: SortDirection | false}) {
  return match(state)
    .with('asc', () => <FaSortAmountDownAlt />)
    .with('desc', () => <FaSortAmountUp />)
    .otherwise(() => <FaSort />)
}