import { Map } from 'immutable';

import {
  GET_SPORTS_START,
  GET_SPORTS_ERROR,
  GET_SPORTS_SUCCESS,
} from 'actions/sports';

const initialState = Map({
  sportsLoading: false,
  sportsError: null,
  sports: null,
});

const actionsMap = {
  // Async action
  [GET_SPORTS_START]: (state) => {
    return state.merge(Map({
      sportsLoading: true,
      sportsError: null,
      sports: null,
    }));
  },
  [GET_SPORTS_ERROR]: (state, action) => {
    return state.merge(Map({
      sportsLoading: false,
      sportsError: action.error.message,
    }));
  },
  [GET_SPORTS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      sportsLoading: false,
      sports: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
