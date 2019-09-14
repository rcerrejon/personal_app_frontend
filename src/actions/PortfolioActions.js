import * as types from '../constants/ActionTypes';
import axios from 'axios';
const url = `${process.env.REACT_APP_SERVERURL}/portfolio`;

export function switchLeftnav() {
  return {
    type: types.SWITCH_LEFTNAV
  }
}

export function switchInfo() {
  return {
    type: types.SWITCH_INFO
  }
}

export function getFolders() {
  return dispatch => {

    axios.get(url)
      .then(res => {
        dispatch({
          type: types.GET_FOLDERS,
          folders: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })

  }
}

export function getProjectPage(id) {
  return dispatch => {

    axios.get(url + `/project/${id}`)
      .then(res => {
        dispatch({
          type: types.GET_PROJECT,
          project: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })

  }
}
