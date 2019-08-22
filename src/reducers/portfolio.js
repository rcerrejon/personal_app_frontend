import * as types from '../constants/ActionTypes'

const initialState = {
  isOpenLeftnav: true,
  isOpenInfo: true,
}


export default function portfolio(state = initialState, action) {
  switch (action.type) {

    case types.SWITCH_LEFTNAV:
      return {
        ...state,
        isOpenLeftnav: !state.isOpenLeftnav
      }

    case types.SWITCH_INFO:
      return {
        ...state,
        isOpenInfo: !state.isOpenInfo
      }
    default:
      return state;
  }
}
