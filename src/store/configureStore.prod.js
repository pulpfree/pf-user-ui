import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ApolloClientSingleton from '../network/apollo-client-singleton'
import rootReducer from '../services/reducers'

export default class Store {
  constructor(history, initialState = {}) {
    this.data = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          ApolloClientSingleton.middleware(),
          ReduxThunk.withExtraArgument(ApolloClientSingleton),
        ),
      )
    )
  }
}