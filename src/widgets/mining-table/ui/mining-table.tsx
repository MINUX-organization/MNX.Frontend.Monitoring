import { Box, Stack, Table } from "@chakra-ui/react";
import { ColumnType, DataType } from "../model/column.type";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import _ from "lodash";
import { generateColumnsFromData } from "../utils/generate-columns-from-data";

interface MiningTableProps extends Table.RootProps {
  columnsDef?: ColumnType[];
  data: DataType[];
  renderAddButton?: () => React.ReactNode;
  actions?: ((id: string) => React.ReactNode)[];
}

export function MiningTable({ columnsDef, data, renderAddButton, actions, ...props }: MiningTableProps) {
  const columnsDefDefault = columnsDef || generateColumnsFromData(data);

  const table = useReactTable({
    data,
    columns: columnsDefDefault,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" borderColor={'minux.solid'}>
      <Table.Root {...props} interactive>
        <Table.Header>
          {_.map(table.getHeaderGroups(), (headerGroup) => (
            <Table.Row key={headerGroup.id} bg={'bg.transparent'} borderBottomColor={'minux.solid'}>
              {_.map(headerGroup.headers, (header) => (
                <Table.ColumnHeader key={header.id} textStyle={'md'} borderBottomColor={'minux.solid'}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.ColumnHeader>
              ))}
              {actions && 
                <Table.ColumnHeader borderBottomColor={'minux.solid'}>
                  <Stack direction={'row'} justify={'flex-end'}>{renderAddButton?.()}</Stack>
                </Table.ColumnHeader>}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body >
          {_.map(table.getRowModel().rows, (row) => (
            <Table.Row key={row.id} bg={'bg.transparent'} _hover={{ bg: 'bg.hover' }}>
              {_.map(row.getVisibleCells(), (cell) => (
                <Table.Cell key={cell.id} textStyle={'md'}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
              {actions && 
                <Table.Cell>
                  <Stack direction={'row'} justify={'flex-end'}>
                    {_.map(actions, (action) => (
                      <Box key={action.toString()}>{action(row.original.id)}</Box>
                    ))}
                  </Stack>
                </Table.Cell>}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}