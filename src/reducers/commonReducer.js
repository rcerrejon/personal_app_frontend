import * as types from '../constants/ActionTypes'

const initialState = {
  isDataLoaded: false,
  theme: 'dark',
  lang: 'en'
}


export default function blogReducer(state = initialState, action) {
  switch (action.type) {

    case types.SWITCH_LOADEDDATA:
      return {
        ...state,
        isDataLoaded: action.value
      }
    case types.SWITCH_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      }
    case types.SWITCH_LANG:
      return {
        ...state,
        lang: state.lang === 'en' ? 'ru' : 'en'
      }

    default:
      return state;
  }
}
