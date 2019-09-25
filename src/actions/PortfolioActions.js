import * as types from '../constants/ActionTypes';
import axios from 'axios';
const url = `${process.env.REACT_APP_SERVERURL}/portfolio`;

export function switchLeftnav(value) {
  return (dispatch, getState) => {
    if (value != null)
      dispatch({
        type: types.SWITCH_LEFTNAV,
        value
      })
    else {
      let valueFromStore = !getState().portfolio.isOpenLeftnav
      dispatch({
        type: types.SWITCH_LEFTNAV,
        value: valueFromStore
      })
    }
  }
}

export function switchInfo(value) {
  return (dispatch, getState) => {
    if (value != null)
      dispatch({
        type: types.SWITCH_INFO,
        value
      })
    else {
      let valueFromStore = !getState().portfolio.isOpenInfo
      dispatch({
        type: types.SWITCH_INFO,
        value: valueFromStore
      })
    }
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
