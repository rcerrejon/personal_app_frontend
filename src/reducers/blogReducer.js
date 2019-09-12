import * as types from '../constants/ActionTypes'

const initialState = {
  isOpenSearch: true,
  isOpenTags: true,
  tags: [],
  search: '',
  page: 1,
  filters: [
    {
      name: 'All',
      value: 'all',
      width: 40,
      left: '0'
    },
    {
      name: 'Recent',
      value: 'recent',
      width: 70,
      left: '40px'
    },
    {
      name: 'the Best',
      value: 'best',
      width: 80,
      left: '110px'
    }
  ],
  currentFilter: 1,
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
    case types.CURRENT_FILTER:
      return {
        ...state,
        currentFilter: action.filter
      }
    case types.CHOOSE_TAGS:
      return {
        ...state,
        tags: action.tags
      }
    case types.GET_BLOG:
      return {
        ...state,
        articles: action.articles,
        tags: action.tags
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
