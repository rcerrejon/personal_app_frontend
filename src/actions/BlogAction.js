import * as types from '../constants/ActionTypes';
import { setLoadingData } from './CommonAction'
import axios from 'axios'
const url = `${process.env.REACT_APP_SERVERURL}/blog`;

/**
 * @param search {string}
 * @param tags {array}
 * @param filter {string}
 * @param page {number}
 */
export function getBlog(search = '', tags = [], filter = 'recent', page = 1) {

  return (dispatch, getState) => {
    const params = {
      tags: getState().blog.tags.filter(el => el.chosen).map(el => el.id).join(','),
      filter: getState().blog.filters[getState().blog.currentFilter].value,
      page: getState().blog.page,
      search: getState().blog.search.toLowerCase()
    }

    axios.get(url, { params })
      .then(res => {
        let data = {
          type: types.GET_BLOG,
          articles: res.data.articles,
          articlesAmount: res.data.articlesAmount
        }
        data.tags = getState().blog.tags.length === 0
          ?
          res.data.tags.map(el => {
            return {
              ...el,
              chosen: false
            }
          })
          :
          getState().blog.tags

        dispatch(data)
      })
      .catch(err => {
        console.error(err)
      })

    dispatch(setLoadingData(true))
  }
}
export function incrementViews(id) {
  return dispatch => {
    let history = JSON.parse(localStorage.getItem('history')) || null;
    let foundArticle = false
    if (history){
      history.find(el => {
        if (el.id === id){
          foundArticle = true
        }
      })
    }

    if (!foundArticle){
      axios.post(url + `/incrementViews/${id}`)
        .catch(err => {
          console.error(err)
        })
    }
  }
}

export function getArticle(id) {
  return dispatch => {

    axios.get(url + `/${id}`)
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

export function setSearch(search) {
  return {
    type: types.SET_SEARCH,
    search
  }
}

export function currentFilter(filter) {
  return {
    type: types.CURRENT_FILTER,
    filter
  }
}

export function chooseTags(tags) {
  return {
    type: types.CHOOSE_TAGS,
    tags
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
