import ApolloClient, { addQueryMerging } from 'apollo-client'
import ResponseMiddlewareNetworkInterface from './response-middleware-network-interface'
// import log from '../log'

const responseMiddlewareNetworkInterface = new ResponseMiddlewareNetworkInterface('http://localhost:3003/graphql')

// Sample error handling middleware
responseMiddlewareNetworkInterface.use({
  applyResponseMiddleware: (response, next) => {
    if (response.errors) {
      if (typeof window !== 'undefined') {
        // log.error(JSON.stringify(response.errors))
        alert(`There was an error in your GraphQL request: ${response.errors[0].message}`)
      }
    }
    next()
  }
})

const token = 'first-token-value'
const exampleWare1 = {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers.authorization = token
    next()
  }
}

const networkInterface = addQueryMerging(responseMiddlewareNetworkInterface)
networkInterface.use([exampleWare1])

const ApolloClientSingleton = new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject: obj => obj._id
})
export default ApolloClientSingleton
