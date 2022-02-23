import { observer } from 'mobx-react-lite'
import * as C from '@chakra-ui/react'

interface IRowBase {
  _id: string
}

interface IColumn<TRow> {
  dataKey: keyof TRow
  label: string
}

interface ITableRowProps<TRow> {
  row: TRow
  columns: IColumn<TRow>[]
}

interface ITableProps<TRow> {
  rows?: TRow[]
  columns: IColumn<TRow>[]
}

const TableRow = observer(<TRow extends IRowBase>({ row, columns }: ITableRowProps<TRow>) => (
  <C.Tr>
    {columns.map((col) => (
      <C.Td key={col.dataKey.toString()}>{row[col.dataKey]}</C.Td>
    ))}
  </C.Tr>
))

export const Table = observer(<TRow extends IRowBase>({ rows = [], columns }: ITableProps<TRow>) => (
  <C.Table>
    <C.Thead>
      <C.Tr>
        {columns.map((col) => (
          <C.Th key={col.label}>{col.label}</C.Th>
        ))}
      </C.Tr>
    </C.Thead>

    <C.Tbody data-testid="table-body">
      {rows.map((row) => (
        <TableRow<TRow> key={row._id} row={row} columns={columns} />
      ))}
    </C.Tbody>
  </C.Table>
))
