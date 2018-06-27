import { combineReducers } from 'redux';
import games from 'reducers/games';
import sports from 'reducers/sports';

export default combineReducers({
  games,
  sports,
});
