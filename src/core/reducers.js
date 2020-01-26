import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import coreReducer from './store/reducers'
import productsReducer from 'products/store/reducers'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const productsPersistConfig = {
  key: 'products',
  storage,
  blacklist: ['loading']
}

export const createRootReducer = history =>
  persistReducer(
    rootPersistConfig,
    combineReducers({
      core: coreReducer,
      products: persistReducer(productsPersistConfig, productsReducer),
      toastr: toastrReducer,
      form: formReducer,
      router: connectRouter(history)
    })
  )
