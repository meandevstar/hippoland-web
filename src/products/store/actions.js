import ActionTypes from './types'
import * as API from 'core/api'
import { errorHandler } from 'core/helpers'

export const apiAttempt = () => ({ type: ActionTypes.API_ATTEMPT })
export const apiFailure = () => ({ type: ActionTypes.API_FAILURE })
export const getProductsSuccess = payload => ({ type: ActionTypes.GET_PRODUCTS_SUCCESS, payload })
export const getProductSuccess = payload => ({ type: ActionTypes.GET_PRODUCT_SUCCESS, payload })

export const getProducts = params => async dispatch => {
  try {
    dispatch(apiAttempt())

    const { ok, data } = await API.getProducts(params)
    if (!ok) {
      throw data
    }

    dispatch(getProductsSuccess(data))
  } catch (e) {
    dispatch(apiFailure())
    errorHandler(e)
  }
}

export const getProduct = id => async dispatch => {
  try {
    dispatch(apiAttempt())

    const { ok, data } = await API.getProduct(id)
    if (!ok) {
      throw data
    }

    dispatch(getProductSuccess(data))
  } catch (e) {
    dispatch(apiFailure())
    errorHandler(e)
  }
}

