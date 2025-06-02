import { Box, For, HStack, Stack, Table } from "@chakra-ui/react";
import { ColumnType, DataType } from "../model/column.type";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import map from "lodash/map";
import { generateColumnsFromData } from "../utils/generate-columns-from-data";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { SortingIcon, UiSearch } from "@/shared/ui";
import { CheckIcon, UncheckIcon } from "@/shared/assets/svg";
import { debounce } from "lodash";

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
  const [searchText, setSearchText] = useState('');
  
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

  const debouncedSetGlobalFilter = useRef(
    debounce((value: string) => {
      setGlobalFilter(value);
    }, 500,
    { leading: true })
  ).current;

  useEffect(() => {
    return () => {
      debouncedSetGlobalFilter.cancel();
    };
  }, [debouncedSetGlobalFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    debouncedSetGlobalFilter(event.target.value);
  };

  return (
    <Stack direction={'column'} gap={4}>
      {searchable && <HStack justify={'flex-end'} maxW={'300px'}>
        <UiSearch
          bgColor={'bg.transparent'} 
          value={searchText}
            onChange={handleSearchChange}
          onQueryClear={() => {setSearchText(''), setGlobalFilter('')}}
        />
      </HStack>}
      <Table.ScrollArea borderWidth="1px" rounded="md" borderColor={'minux.solid'}>
        <Table.Root {...props} interactive>
          <Table.Header>
            {map(table.getHeaderGroups(), (headerGroup) => (
              <Table.Row key={headerGroup.id} bg={'bg.transparent'} borderBottomColor={'minux.solid'}>
                {map(headerGroup.headers, (header) => {
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
                {renderAddButton && 
                  <Table.ColumnHeader borderBottomColor={'minux.solid'}>
                    <Stack direction={'row'} justify={'flex-end'}>{renderAddButton()}</Stack>
                  </Table.ColumnHeader>}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body >
            <For each={table.getRowModel().rows}>
              {(row) => (
                <Table.Row
                  key={row.id}
                  bg={'bg.transparent'}
                  _hover={{ bg: 'bg.hover' }}
                  transition={'background-color 0.1s ease-in-out'}
                >
                  {map(row.getVisibleCells(), (cell) => {
                    const value = cell.getValue()

                    if (typeof value === 'boolean') {
                      return (
                        <Table.Cell key={cell.id} textStyle={'md'}>
                          {value ? <CheckIcon  w={6} h={6}/> : <UncheckIcon  w={6} h={6}/>}
                        </Table.Cell>
                      )
                    }

                    return (
                      <Table.Cell key={cell.id} textStyle={'md'}>
                        {cell.renderValue() as ReactNode}
                      </Table.Cell>
                    )
                  })}
                  <Table.Cell>
                    <Stack direction={'row'} justify={'flex-end'}>
                      {map(actions, (action) => (
                        <Box key={action.toString()}>{action(row.original as T)}</Box>
                      ))}
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Stack>
  )
}