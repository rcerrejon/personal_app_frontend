import * as types from '../constants/ActionTypes'

const initialState = {
  isOpenLeftnav: true,
  isOpenInfo: true,
  folders: [],
  project: {}
}


export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_PROJECT:
      return {
        ...state,
        project: action.project
      }

    case types.GET_FOLDERS:
      action.folders[0].open = true;
      return {
        ...state,
        folders: action.folders
      }

    case types.SWITCH_LEFTNAV:
      return {
        ...state,
        isOpenLeftnav: action.value
      }

    case types.SWITCH_INFO:
      return {
        ...state,
        isOpenInfo: action.value
      }
    default:
      return state;
  }
}
