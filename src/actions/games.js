export const GET_GAMES_START = 'GET_GAMES_START';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_ERROR = 'GET_GAMES_ERROR';

export function getGames() {
  return {
    type: GET_GAMES_START,
  };
}
