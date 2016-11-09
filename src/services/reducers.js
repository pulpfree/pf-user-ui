// import ApolloClient from 'apollo-client'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { alerts } from '../modules/alert/alertReducer'
import { user } from '../modules/user/userReducer'
import { site } from '../modules/site/siteReducer'

// const client = new ApolloClient()
import ApolloClientSingleton from '../network/apollo-client-singleton'

const rootReducer = combineReducers({
  apollo: ApolloClientSingleton.reducer(),
  routing: routerReducer,
  alerts,
  site,
  user,
})

export default rootReducer