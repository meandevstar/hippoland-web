import { create } from 'apisauce'

const API = create({ baseURL: process.env.REACT_APP_API_BASE_URL })

API.addResponseTransform(response => {
  const { ok, data, problem } = response

  if (!ok) {
    switch (problem) {
      case 'CLIENT_ERROR':
        response.data = {
          status: 'error',
          ...data
        }
        break

      case 'TIMEOUT_ERROR':
        response.status = 408
        response.data = {
          status: 'error',
          message: 'Network timeout. Please try again.',
          ...data
        }
        break

      case 'CONNECTION_ERROR':
        response.status = 503
        response.data = {
          status: 'error',
          message: 'Server not available.',
          ...data
        }
        break

      case 'NETWORK_ERROR':
        response.status = 511
        response.data = {
          status: 'error',
          message: 'Network unavailable.',
          ...data
        }
        break

      case 'CANCEL_ERROR':
        response.status = 500
        response.data = {
          status: 'error',
          message: 'Request has been cancelled.',
          ...data
        }
        break

      default:
        response.status = 500
        response.data = {
          status: 'error',
          message: 'System error.',
          ...data
        }
    }
  }
})

/* --------- Product ---------- */
export const getProducts = params => makeCall('GET', `products/`, params)

export const getProduct = id => makeCall('GET', `products/${id}`)
/* ------------------------- */

// Load UI after store persists
const makeCall = (method, ...args) =>
  new Promise(resolve =>
    setTimeout(() => {
      API[method.toLowerCase()](...args).then(resolve)
    }, 0)
  )
