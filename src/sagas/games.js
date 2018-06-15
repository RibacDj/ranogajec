import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_GAMES_START,
  GET_GAMES_ERROR,
  GET_GAMES_SUCCESS,
} from 'actions/games';

import api from 'api';

function createGetGames() {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getGames(options.id));
      console.log('aaaa', data);
      const action = { type: GET_GAMES_SUCCESS, data };

      yield put(action);
    } catch (error) {
      const action = { type: GET_GAMES_ERROR, error };

      yield put(action);
    }
  };
}

export const getGames = createGetGames();

export function* getGamesWatcher() {
  yield takeLatest(GET_GAMES_START, getGames)
}

export default [
  getGamesWatcher(),
];
