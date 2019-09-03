import * as types from '../constants/ActionTypes';
import { setLoadingData } from './CommonAction'
import axios from 'axios'
const url = `${process.env.REACT_APP_SERVERURL}`;

export function getBlog(options) {
  return dispatch => {

    axios.get(url + '/blog')
      .then(res => {
        dispatch({
          type: types.GET_BLOG,
          articles: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })

    dispatch(setLoadingData(true))
  }
}

export function getArticle(id) {
  return dispatch => {

    axios.get(url + '/blog/' + id)
      .then(res => {
        dispatch({
          type: types.GET_ARTICLE,
          article: res.data
        })
      })
      .catch(err => {
        console.error(err)
      })

    dispatch(setLoadingData(true))
  }
}

export function switchSearch() {
  return {
    type: types.SWITCH_SEARCH
  }
}

export function switchTags() {
  return {
    type: types.SWITCH_TAGS
  }
}
