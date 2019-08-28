import * as types from '../constants/ActionTypes';

export function getTags() {
  const tags = []
  return {
    type: types.GET_TAGS
  }
}
