import * as types from '../constants/ActionTypes';
import axios from 'axios'
const url = `http://udachin.tech/api/contacts`;

export function getLinks() {
  return (dispatch) => {
    axios.get(url)
      .then(res => {
        let data = {
          type: types.GET_LINKS,
          links: res.data,
        }

        dispatch(data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

/**
 * @param mail {object}
 * */
export function postMail(mail) {
  return dispatch => {
    axios.post(`${url}/mail`, mail)
      .then(res => res.data)
      .catch(e => e)
  }
}
