import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'

import NotFoundPage from './containers/NotFoundPage'
import BadPermPage from './containers/BadPermPage'
import ProductsPage from 'products/containers/ProductsPage'

const Routes = () => (
  <>
    <Switch>
      <Redirect exact from='/' to='products' />
      <Route path='/products' component={ProductsPage} />
      <Route path='/forbidden' component={BadPermPage} />
      <Route path='*' component={NotFoundPage} />
    </Switch>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position='top-right'
      transitionIn='fadeIn'
      transitionOut='fadeOut'
    />
  </>
)

export default Routes
