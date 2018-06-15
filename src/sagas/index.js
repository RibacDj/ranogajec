import { all } from 'redux-saga/effects';

import gamesSagas from 'sagas/games';

export default function* rootSaga() {
  yield all([
    ...gamesSagas,
  ]);
}
