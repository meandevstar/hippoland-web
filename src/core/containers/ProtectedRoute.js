import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { decodeJWT } from 'core/helpers'
import BadPermPage from './BadPermPage'

const ProtectedRoute = ({ component: Component, children, token, user, location, role, ...rest }) => {
  if (token) {
    try {
      const tokenDecoded = decodeJWT(token)

      // if token is expired
      if (Date.now() - tokenDecoded.exp * 1000 > 0) {
        throw new Error('Session Expired, Please login again')
      }
    } catch (err) {
      return <Redirect to='/login' />
    }

    const userType = user && user.type
    let canActivate = true

    if (role) {
      canActivate = typeof role === 'string' ? role === userType : role.indexOf(userType) !== -1
    }

    if (canActivate) {
      return Component ? <Route {...rest} component={Component} /> : <Route {...rest}>{children}</Route>
    } else {
      return <BadPermPage code={403} message='You are not allowed to view this page' />
    }
  } else {
    return <Redirect to='/login' />
  }
}

const mapStateToProps = ({ auth: { token, user } }) => ({
  token,
  user
})

export default connect(mapStateToProps, null)(ProtectedRoute)
