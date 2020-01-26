import ActionTypes from './types'

const initialState = {
  version: ''
}

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_VERSION:
      return {
        ...state,
        version: action.payload
      }

    default:
      return state
  }
}

export default coreReducer
