import * as types from '../constants/ActionTypes'

const initialState = {
  links: []
}


export default function contactsReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_LINKS:
      return {
        ...state,
        links: action.links
      }

    default:
      return state;
  }
}
