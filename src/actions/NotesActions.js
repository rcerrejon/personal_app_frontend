import * as types from '../constants/ActionTypes';
import axios from 'axios/index';

export function getUserNotes(user_id) {
  return dispatch => {
    const url = `${__serverURL__}notes`;

    axios.get(url)
      .then(res => {
        dispatch({
          type: types.GET_USER_NOTES,
          notes: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function addNote(name) {
  return {
    type: types.ADD_NOTE,
    name
  }
}

export function deleteNote(id) {
  return {
    type: types.DELETE_NOTE,
    id
  }
}
