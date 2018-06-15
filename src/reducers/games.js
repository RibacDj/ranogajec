import { Map } from 'immutable';

import {
  GET_GAMES_START,
  GET_GAMES_ERROR,
  GET_GAMES_SUCCESS,
} from 'actions/games';

const initialState = Map({
  loading: false,
  error: null,
  games: null,
});

const actionsMap = {
  // Async action
  [GET_GAMES_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      games: null,
    }));
  },
  [GET_GAMES_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_GAMES_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      games: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
