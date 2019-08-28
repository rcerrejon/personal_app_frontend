import * as types from '../constants/ActionTypes'

const initialState = {
  tags: [
    {
      id: 1,
      name: 'Frontend'
    }
  ]
}


export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_TAGS:
      return {

      }

    default:
      return state;
  }
}
