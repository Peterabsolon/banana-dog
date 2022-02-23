import { observer } from 'mobx-react-lite'

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
  <tr>
    {columns.map((col) => (
      <td key={col.dataKey.toString()}>{row[col.dataKey]}</td>
    ))}
  </tr>
))

export const Table = observer(
  <TRow extends IRowBase>({ rows = [], columns }: ITableProps<TRow>) => (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.label}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody data-testid="table-body">
        {rows.map((row) => (
          <TableRow<TRow> key={row._id} row={row} columns={columns} />
        ))}
      </tbody>
    </table>
  )
)
