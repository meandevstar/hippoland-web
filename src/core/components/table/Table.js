import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableRow, TablePagination } from '@material-ui/core'
import TablePaginationActions from './PaginationActions'
import TableHeader from './TableHeader'

const CustomPaginationTable = ({ rows, headers, total, onPageChange, onSortChange, onCellClick }) => {
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(headers[0].id)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length)

  const handleChangePage = (e, pageNo, limit) => {
    setPage(pageNo)
    onPageChange({ pageNo, limit: limit || rowsPerPage })
  }

  const handleChangeRowsPerPage = e => {
    const limit = parseInt(e.target.value, 10)

    setRowsPerPage(limit)
    handleChangePage(null, 0, limit)
  }

  const onRequestSort = property => {
    const isDesc = orderBy === property && order === 'desc'
    const newOrder = isDesc ? 'asc' : 'desc'

    setOrder(newOrder)
    setOrderBy(property)
    onSortChange({
      order: newOrder,
      orderBy: property
    })
  }

  const _onCellClick = data => e => {
    onCellClick(data)
  }

  const renderTableCell = row => (header, index) => {
    let data = row[header.id]

    if (header.numeric) {
      data = +data
    }
    if (header.date) {
      data = new Date(data).toLocaleString()
    }

    return (
      <TableCell
        key={`cell_${index}`}
        align={header.numeric ? 'right' : 'left'}
        padding={header.disablePadding ? 'none' : 'default'}
        className='cursor-pointer'
        onClick={_onCellClick(row)}
      >
        {data}
      </TableCell>
    )
  }

  return (
    <Table className='overflow-x-auto' aria-label='hippoland-table'>
      <TableHeader headers={headers} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>{headers.map(renderTableCell(row))}</TableRow>
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={headers.length}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default CustomPaginationTable
