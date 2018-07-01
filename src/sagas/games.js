import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_GAMES_START,
  GET_GAMES_ERROR,
  GET_GAMES_SUCCESS,
  GET_SPORT_GAMES_START,
  GET_SPORT_GAMES_ERROR,
  GET_SPORT_GAMES_SUCCESS,
} from 'actions/games';

import api from 'api';

function createGetGames() {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getGames(options.id));
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
  yield takeLatest(GET_GAMES_START, getGames);
}

function createGetSportGames() {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const { id, sport, league } = options;
      const data = yield call(() => api.getSportGames(id, sport, league));
      const sportPeriods = yield call(() => api.getSportPeriods(id, sport, league));
      const action = {
        type: GET_SPORT_GAMES_SUCCESS,
        data,
        sportPeriods,
        sport,
        league,
      };

      yield put(action);
    } catch (error) {
      const action = { type: GET_SPORT_GAMES_ERROR, error };

      yield put(action);
    }
  };
}

export const getSportGames = createGetSportGames();

export function* getSportGamesWatcher() {
  yield takeLatest(GET_SPORT_GAMES_START, getSportGames);
}

export default [
  getGamesWatcher(),
  getSportGamesWatcher(),
];
