import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ApolloClientSingleton from '../network/apollo-client-singleton'
import rootReducer from '../services/reducers'

export default class Store {
  constructor(history, initialState = {}) {
    /*const reducer = combineReducers({
      ...reducers,
      apollo: ApolloClientSingleton.reducer(),
      routing: routerReducer
    })*/

    this.data = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          ApolloClientSingleton.middleware(),
          ReduxThunk.withExtraArgument(ApolloClientSingleton)
        ),
         typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
      )
    )
  }
}