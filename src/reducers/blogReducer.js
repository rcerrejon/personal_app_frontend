import * as types from '../constants/ActionTypes'

const initialState = {
  isOpenSearch: true,
  isOpenTags: true,
  tags: [],
  articlesAmount: 0,
  search: '',
  page: 1,
  filters: [
    {
      name_ru: 'Все',
      name_en: 'All',
      value: 'all',
      width: 40,
      left: '0'
    },
    {
      name_ru: 'Ранее',
      name_en: 'Recent',
      value: 'recent',
      width: 70,
      left: '40px'
    },
    {
      name_ru: 'Лучшее',
      name_en: 'The best',
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
    case types.SET_SEARCH:
      return {
        ...state,
        search: action.search
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
