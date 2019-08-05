import * as types from '../constants/ActionTypes'

const initialState = {
  notes: []
}


export default function notes(state = initialState, action) {
  switch (action.type) {

    case types.ADD_NOTE:
      const newId = state.notes[state.notes.length - 1].id + 1;
      return {
        ...state,
        notes: [
            ...state.notes,
            {
              id: newId,
              name: action.name
            }
        ]
      }

    case types.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id)
      }

    case types.GET_USER_NOTES:
      return {
        ...state,
        notes: action.notes
      }

  default:
    return state;
  }
}
