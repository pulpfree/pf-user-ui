import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import configureStore from './store/configureStore'
import createRoutes from './services/routes'

import './index.css'

const client  = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3003/graphql',
    opts: {
      // credentials: 'same-origin',
      // mode: 'no-cors',
    }
  })
})
const store   = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const routes  = createRoutes(store)

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
