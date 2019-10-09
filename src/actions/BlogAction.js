import * as types from '../constants/ActionTypes';
import { setLoadingData } from './CommonAction'
import axios from 'axios'
const url = `${process.env.REACT_APP_SERVERURL}/blog`;

export function getBlog() {
  return async (dispatch, getState) => {
    const stateBlog = getState().blog;

    const params = {
      tags: stateBlog.tags.filter(el => el.chosen).map(el => el.id).join(','),
      filter: stateBlog.filters[getState().blog.currentFilter].value,
      page: stateBlog.page,
      search: stateBlog.search.toLowerCase()
    }

    await axios.get(url, { params })
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

export function sendComment(id, body){
  return async (dispatch) => {

    return await axios.post(url + `/sendComment/${id}`, body)
      .then(res => {
        dispatch(getArticle(id))
        return res.data
      })
      .catch(e => e)

  }
}

export function incrementViews(id) {
  return async (dispatch) => {
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
      await axios.post(url + `/incrementViews/${id}`)
        .catch(err => {
          console.error(err)
        })
    }
  }
}

export function getArticle(id) {
  return async (dispatch) => {

    await axios.get(url + `/${id}`)
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

export function switchSearch(value) {
  return (dispatch, getState) => {
    if (value != null)
      dispatch({
        type: types.SWITCH_SEARCH,
        value
      })
    else {
      let valueFromStore = !getState().blog.isOpenSearch
      dispatch({
        type: types.SWITCH_SEARCH,
        value: valueFromStore
      })
    }
  }
}

export function switchTags(value) {
  return (dispatch, getState) => {
    if (value != null)
      dispatch({
        type: types.SWITCH_TAGS,
        value
      })
    else {
      let valueFromStore = !getState().blog.isOpenTags
      dispatch({
        type: types.SWITCH_TAGS,
        value: valueFromStore
      })
    }
  }
}
