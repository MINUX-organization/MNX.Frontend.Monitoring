import { SortingIcon, UiButton, UiSearch } from "@/shared/ui";
import { Stack, StackProps } from "@chakra-ui/react";
import { 
  ColumnDef,
  FilterFn, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getSortedRowModel, 
  SortingState, 
  useReactTable 
} from "@tanstack/react-table"
import flatMap from "lodash/flatMap";
import map from "lodash/map";
import React, { useState } from "react";

export interface GenericListProps<T> extends Omit<StackProps, 'columns'> {
  data: T[];
  columns?: ColumnDef<T>[];
  searchable?: boolean;
  sortable?: boolean;
  customGlobalFilterFn?: FilterFn<T>
  renderItem?: (item: T) => React.ReactNode;
  renderAddButton?: () => React.ReactNode;
}

export function GenericList<T>({ 
  data, 
  columns, 
  searchable, 
  sortable,
  renderItem,
  renderAddButton,
  customGlobalFilterFn,
  ...props
}: GenericListProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columnsMap: ColumnDef<T>[] = map(columns, (column) => ({
    ...column,
    enableSorting: sortable ?? false
  }))

  const table = useReactTable({
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    data,
    columns: columnsMap,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: customGlobalFilterFn || 'includesString',
  })

  return (
    <Stack gap={4} {...props}>
      <Stack direction={{ base: 'column', md: 'row'}}>
        {searchable && (
          <UiSearch
            value={globalFilter}
            bg={'bg.transparent'}
            onQueryClear={() => setGlobalFilter('')}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        )}
        {flatMap(table.getHeaderGroups(), (headerGroup) => (
          <Stack key={headerGroup.id} direction={'row'}>
            {map(headerGroup.headers, (header) => (
              <React.Fragment key={header.id}>
                {sortable && <UiButton onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <SortingIcon state={header.column.getIsSorted()} />
                </UiButton>}
              </React.Fragment>
            ))}
            {renderAddButton?.()}
          </Stack>
        ))}
      </Stack>
      <Stack gap={3}>
        {map(table.getRowModel().rows, (row) => (
          <React.Fragment key={row.id}>
            {renderItem?.(row.original)}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  )
}