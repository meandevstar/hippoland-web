import React from 'react'
import { Table, TableBody, TableCell, TableFooter, TableRow, TablePagination } from '@material-ui/core'
import TablePaginationActions from './PaginationActions'


const CustomPaginationTable= ({ rows, total, onPageChange }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

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

  return (
    <Table className='overflow-x-auto' aria-label='custom pagination table'>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell component='th' scope='row'>
              {row.name}
            </TableCell>
            <TableCell>{row.url}</TableCell>
            <TableCell>{row.image_url}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.date_created}</TableCell>
          </TableRow>
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
            colSpan={3}
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