import * as types from '../constants/ActionTypes';
import axios from 'axios'

export function setLoadingData(value) {
  return {
    type: types.SWITCH_LOADEDDATA,
    value
  }
}
