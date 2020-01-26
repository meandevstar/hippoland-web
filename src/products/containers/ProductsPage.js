import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Table } from 'core/components'
import * as ProductsActions from 'products/store/actions'

const headers = []

const ProductsPage = ({ classes, data, loading, total, getProducts }) => {
  const search = useRef('')
  const filters = useRef({})
  const [pagination, setPagination] = useState({
    limit: 5,
    pageNo: 0
  })

  useEffect(() => {
    onSearch()
  // eslint-disable-next-line
  }, [])
  useEffect(() => {
    onSearch()
  // eslint-disable-next-line
  }, [pagination])

  const onSearch = () => {
    const params = {
      ...filters.current,
      ...pagination
    }
    getProducts(params)
  }

  const onPageChange = (data) => {
    setPagination(data)
  }

  return (
    <div className='flex justify-center items-center p-40'>
      <Table rows={data} total={total} loading={loading} onPageChange={onPageChange} />
    </div>
  )
}

const styles = () => ({
  section: {
    display: 'flex',

    '& .left': {
      flex: 1,
      maxWidth: 300,
      minWidth: 200,
    },
    '& .right': {
      flex: 3,
      padding: '0 48px',
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
  getProducts: params => dispatch(ProductsActions.getProducts(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductsPage))