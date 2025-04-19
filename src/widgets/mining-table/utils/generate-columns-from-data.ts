import { ColumnType, DataType } from "../model/column.type"

export const generateColumnsFromData = (data: DataType[], sortable: boolean): ColumnType[] => {
  if (!data.length) return []
  
  return Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase()),
    enableSorting: sortable,
  })).filter((column) => column.accessorKey !== 'id')
}
