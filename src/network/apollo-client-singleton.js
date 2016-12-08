import ApolloClient, { addQueryMerging } from 'apollo-client'
import ResponseMiddlewareNetworkInterface from './response-middleware-network-interface'
// import log from '../log'
import { config } from '../config/config'
import { userAuthVals } from '../utils'

const responseMiddlewareNetworkInterface = new ResponseMiddlewareNetworkInterface(`${config.BASE_URL}`)

// Sample error handling middleware
responseMiddlewareNetworkInterface.use({
  applyResponseMiddleware: (response, next) => {
    if (response.errors) {
      if (typeof window !== 'undefined') {
        // log.error(JSON.stringify(response.errors))
        console.error(response.errors)
        alert(`There was an error in your GraphQL request: ${response.errors[0].message}`)
      }
    }
    next()
  }
})

const authWare = {
  applyMiddleware(req, next) {
    const token = userAuthVals.getToken()
    // console.log('token in network:', token)
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers.Authorization = token ? `Bearer ${token}` : null
    next()
  }
}

const networkInterface = addQueryMerging(responseMiddlewareNetworkInterface)
networkInterface.use([authWare])

const ApolloClientSingleton = new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject: obj => obj._id
})
export default ApolloClientSingleton
