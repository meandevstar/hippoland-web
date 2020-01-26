import { toastr } from 'react-redux-toastr'

export const errorHandler = error => {
  switch (error.name) {
    default:
      toastr.error(error.name, error.message)
  }
}

export const validateEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( // eslint-disable-line no-useless-escape
    email
  )

export const validatePassword = password => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/.test(password)

export const decodeJWT = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(atob(base64))
}
