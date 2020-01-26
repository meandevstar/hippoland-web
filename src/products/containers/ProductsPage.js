import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper } from '@material-ui/core'
import { Table } from 'core/components'
import * as ProductsActions from 'products/store/actions'

const headers = [
  { id: 'sku', numeric: false, disablePadding: false, label: 'SKU' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'url', numeric: false, disablePadding: false, label: 'Product URL' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price (лв)' },
  // { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
  { id: 'date_created', date: true, disablePadding: false, label: 'Created At' }
]

const ProductsPage = ({ data, loading, total, getProducts }) => {
  const filters = useRef({})
  const [pagination, setPagination] = useState({
    limit: 5,
    pageNo: 0
  })
  const [sort, setSort] = useState({
    orderBy: headers[0].id,
    order: 'asc'
  })

  useEffect(() => {
    onSearch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    onSearch()
    // eslint-disable-next-line
  }, [pagination, sort])

  const onSearch = () => {
    const params = {
      ...filters.current,
      ...pagination,
      ...sort
    }
    getProducts(params)
  }

  const onPageChange = data => {
    setPagination(data)
  }

  const onSortChange = data => {
    setSort(data)
  }

  return (
    <div className='flex justify-center items-center p-40'>
      <Paper className='w-full mb-20'>
        <Table headers={headers} rows={data} total={total} loading={loading} onPageChange={onPageChange} onSortChange={onSortChange} />
      </Paper>
    </div>
  )
}

const styles = () => ({
  section: {
    display: 'flex',

    '& .left': {
      flex: 1,
      maxWidth: 300,
      minWidth: 200
    },
    '& .right': {
      flex: 3,
      padding: '0 48px'
    }
  },
  loadingIcon: {
    color: 'currentColor',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const mapStateToProps = ({ products: { data, loading, total } }) => ({
  data,
  loading,
  total
})

const mapDispatchToProps = dispatch => ({
  getProducts: params => dispatch(ProductsActions.getProducts(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductsPage))
