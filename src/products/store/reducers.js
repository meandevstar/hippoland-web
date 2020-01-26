import ActionTypes from './types'
import { union } from 'lodash'

const initialState = {
  loading: false,
  total: 0,
  data: []
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.API_ATTEMPT:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.API_FAILURE:
      return {
        ...state,
        loading: false
      }

    case ActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...action.payload,
        loading: false
      }

    case ActionTypes.GET_PRODUCT_SUCCESS:
      const data = union([...state.data, action.payload])
      const totalDiffers = data.length - state.data.length

      return {
        total: state.total + totalDiffers,
        loading: false,
        data
      }

    default:
      return state
  }
}

export default productsReducer
