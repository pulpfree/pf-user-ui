// import { call, fork, put, select} from 'redux-saga/effects'
import { select} from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import * as siteActions from './siteActions'
import * as siteSelectors from './siteSelectors'


export function* sitePersist() {

  const { siteScratchSelector } = siteSelectors,
    site = yield select(siteScratchSelector)

  console.log('site:', site)
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchSitePersist() {
  yield takeEvery(siteActions.SITE_PERSIST.REQUEST, sitePersist)
}

/*export default function* siteSagas() {
  yield [
    fork(watchSitePersist)
  ]
}*/