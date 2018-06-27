import { all } from 'redux-saga/effects';

import gamesSagas from 'sagas/games';
import sportsSagas from 'sagas/sports';

export default function* rootSaga() {
  yield all([
    ...gamesSagas,
    ...sportsSagas,
  ]);
}
