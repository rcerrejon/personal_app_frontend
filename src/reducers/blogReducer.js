import * as types from '../constants/ActionTypes'

const initialState = {
  isOpenSearch: true,
  isOpenTags: true,
  tags: [
    {
      id: 1,
      name: 'Frontend'
    }
  ]
}


export default function blogReducer(state = initialState, action) {
  switch (action.type) {

    case types.SWITCH_SEARCH:
      return {
        ...state,
        isOpenSearch: !state.isOpenSearch
      }

    case types.SWITCH_TAGS:
      return {
        ...state,
        isOpenTags: !state.isOpenTags
      }

    default:
      return state;
  }
}
