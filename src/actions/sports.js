export const GET_SPORTS_START = 'GET_SPORTS_START';
export const GET_SPORTS_SUCCESS = 'GET_SPORTS_SUCCESS';
export const GET_SPORTS_ERROR = 'GET_SPORTS_ERROR';

export function getSports() {
  return {
    type: GET_SPORTS_START,
  };
}
