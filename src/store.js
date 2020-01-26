import configureStore from './configure-store'
import history from './history'

const initialState = window.initialReduxState
const { store, persistor } = configureStore(history, initialState)

export default {
  store,
  persistor,
  history
}
