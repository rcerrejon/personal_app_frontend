import * as types from '../constants/ActionTypes';

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
