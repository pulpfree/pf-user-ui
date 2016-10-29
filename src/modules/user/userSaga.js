// import { call, fork, put, select} from 'redux-saga/effects'
import { select} from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import * as userActions from './userActions'
import * as userSelectors from './userSelectors'


export function* userPersist() {

  const { userScratchSelector } = userSelectors,
    user = yield select(userScratchSelector)

  console.log('user:', user)
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchUserPersist() {
  yield takeEvery(userActions.USER_PERSIST.REQUEST, userPersist)
}

/*export default function* userSagas() {
  yield [
    fork(watchUserPersist)
  ]
}*/
