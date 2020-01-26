import { toastr } from 'react-redux-toastr'

export const errorHandler = error => {
  switch (error.name) {
    default:
      toastr.error(error.name, error.message)
  }
}
