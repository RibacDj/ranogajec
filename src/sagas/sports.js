import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_SPORTS_START,
  GET_SPORTS_ERROR,
  GET_SPORTS_SUCCESS,
} from 'actions/sports';

import api from 'api';

function createGetSports() {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getSports(options.id));
      const action = { type: GET_SPORTS_SUCCESS, data };

      yield put(action);
    } catch (error) {
      const action = { type: GET_SPORTS_ERROR, error };

      yield put(action);
    }
  };
}

export const getSports = createGetSports();

export function* getSportsWatcher() {
  yield takeLatest(GET_SPORTS_START, getSports)
}

export default [
  getSportsWatcher(),
];
