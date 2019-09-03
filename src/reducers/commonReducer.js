import * as types from '../constants/ActionTypes'

const initialState = {
  isDataLoaded: false,
}


export default function blogReducer(state = initialState, action) {
  switch (action.type) {

    case types.SWITCH_LOADEDDATA:
      return {
        ...state,
        isDataLoaded: action.value
      }

    default:
      return state;
  }
}
