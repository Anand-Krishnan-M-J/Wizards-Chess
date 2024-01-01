import { fork, all } from 'redux-saga/effects';
import { gameWatcher } from './firebase';

export function* rootSaga(): any {
  yield all([yield fork(gameWatcher)]);
}
