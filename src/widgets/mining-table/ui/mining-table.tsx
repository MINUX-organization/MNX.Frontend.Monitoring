import { Box, HStack, Stack, Table } from "@chakra-ui/react";
import { ColumnType, DataType } from "../model/column.type";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import _ from "lodash";
import { generateColumnsFromData } from "../utils/generate-columns-from-data";
import { useMemo, useState } from "react";
import { SortingIcon, UiSearch } from "@/shared/ui";

interface MiningTableProps<T> extends Table.RootProps {
  columnsDef?: ColumnType[];
  data: DataType[];
  renderAddButton?: () => React.ReactNode;
  actions?: ((item: T) => React.ReactNode)[];
  searchable?: boolean;
  sortable?: boolean;
}

export function MiningTable<T>({ 
  columnsDef, 
  data, 
  renderAddButton, 
  actions, 
  searchable,
  sortable,
  ...props 
} : MiningTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  
  const columnsDefDefault = useMemo(() => 
    columnsDef || generateColumnsFromData(data, sortable ?? false),
    [columnsDef, data, sortable]
  );

  const table = useReactTable({
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    data,
    columns: columnsDefDefault,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Stack direction={'column'} gap={4}>
      {searchable && <HStack justify={'flex-end'}>
        <UiSearch
          w={'100%'}
          maxW={'300px'}
          bgColor={'bg.transparent'} 
          value={globalFilter} 
          onChange={(event) => setGlobalFilter(event.target.value)} 
          onQueryClear={() => setGlobalFilter('')}
        />
      </HStack>}
      <Table.ScrollArea borderWidth="1px" rounded="md" borderColor={'minux.solid'}>
        <Table.Root {...props} interactive>
          <Table.Header>
            {_.map(table.getHeaderGroups(), (headerGroup) => (
              <Table.Row key={headerGroup.id} bg={'bg.transparent'} borderBottomColor={'minux.solid'}>
                {_.map(headerGroup.headers, (header) => {
                  const column = header.column;
                  return (
                    <Table.ColumnHeader 
                      key={header.id} 
                      textStyle={'md'} 
                      borderBottomColor={'minux.solid'}
                      cursor={column.getCanSort() ? 'pointer' : 'default'}
                      onClick={column.getToggleSortingHandler()}
                      userSelect={'none'}
                    >
                      <HStack gap={2}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(column.columnDef.header, header.getContext())}
                        &nbsp;
                        <SortingIcon state={column.getIsSorted()}/>
                      </HStack>
                    </Table.ColumnHeader>
                  )
                })}
                {actions && 
                  <Table.ColumnHeader borderBottomColor={'minux.solid'}>
                    <Stack direction={'row'} justify={'flex-end'}>{renderAddButton?.()}</Stack>
                  </Table.ColumnHeader>}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body >
            {_.map(table.getRowModel().rows, (row) => (
              <Table.Row 
                key={row.id} 
                bg={'bg.transparent'} 
                _hover={{ bg: 'bg.hover' }} 
                transition={'background-color 0.1s ease-in-out'}
              >
                {_.map(row.getVisibleCells(), (cell) => (
                  <Table.Cell key={cell.id} textStyle={'md'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
                {actions && 
                  <Table.Cell>
                    <Stack direction={'row'} justify={'flex-end'}>
                      {_.map(actions, (action) => (
                        <Box key={action.toString()}>{action(row.original as T)}</Box>
                      ))}
                    </Stack>
                  </Table.Cell>}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Stack>
  )
}