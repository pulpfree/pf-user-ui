import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

// import DevTools from '../components/DevTools'

// import api from '../middleware/api'
import rootReducer from '../services/reducers'
import rootSaga from '../services/rootSaga'

const sagaMiddleWare = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(
    // thunk,
    // api,
    sagaMiddleWare,
    createLogger(),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  // DevTools.instrument()
)

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  sagaMiddleWare.run(rootSaga)

  // Required for replaying actions from devtools to work
  // reduxRouterMiddleware.listenForReplays(store)

  /*if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }*/

  return store
}
