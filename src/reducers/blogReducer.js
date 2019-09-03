import * as types from '../constants/ActionTypes'
import { setLoadingData } from '../actions/CommonAction'

const initialState = {
  isOpenSearch: true,
  isOpenTags: true,
  tags: [],
  articles: [],
  article: {}
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
    case types.GET_BLOG:
      return {
        ...state,
        articles: action.articles
      }
    case types.GET_ARTICLE:
      return {
        ...state,
        article: action.article
      }

    default:
      return state;
  }
}
