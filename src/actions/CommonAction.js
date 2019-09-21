import * as types from '../constants/ActionTypes';
import axios from 'axios'

export function setLoadingData(value) {
  return {
    type: types.SWITCH_LOADEDDATA,
    value
  }
}

export function switchTheme() {
  return {
    type: types.SWITCH_THEME
  }
}

export function switchLang() {
  return {
    type: types.SWITCH_LANG
  }
}
