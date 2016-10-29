import { fork } from 'redux-saga/effects'

import { watchSitePersist } from '../modules/site/siteSaga'
import { watchUserPersist } from '../modules/user/userSaga'


export default function* rootSaga() {
  yield [
    fork(watchSitePersist),
    fork(watchUserPersist),
  ]
}
