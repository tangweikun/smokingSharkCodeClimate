import React from 'react'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
  IntrospectionFragmentMatcher,
} from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'

const getUri = (isWebsocket) => {
  const env = process.env.NODE_ENV_TAG
  console.log('process.env', process.env)
  const maps = {
    production: isWebsocket
      ? 'wss://pigeon.gtzh.ihealthcn.com/feedback'
      : 'https://pigeon.gtzh.ihealthcn.com/8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo',
    stg: isWebsocket
      ? 'wss://pigeon.gtzh-play.51ijk.com/feedback'
      : 'https://pigeon.gtzh-play.51ijk.com/8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo',
  }
  return (
    maps[env] ||
    (isWebsocket
      ? 'ws://localhost:3080/feedback'
      : 'http://localhost:3080/8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo')
  )
}

const httpNetworkInterface = createNetworkInterface({
  uri: getUri(),
})

httpNetworkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // Create the header object if needed.
      }
      req.options.headers['client-codename'] = 'TEST'
      req.options.headers['Access-Control-Allow-Origin'] = '*'
      req.options.headers.authorization = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
      next()
    },
  },
])
const wsUri = getUri(true)
const subscriptionClient = new SubscriptionClient(wsUri, {
  reconnect: true,
  connectionParams: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  },
})

const networkInterface = addGraphQLSubscriptions(httpNetworkInterface, subscriptionClient)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'ChatMessage',
          possibleTypes: [
            { name: 'AudioMessage' },
            { name: 'TextMessage' },
            { name: 'ImageMessage' },
          ],
        },
      ],
    },
  },
})

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher,
})
const history = createBrowserHistory()

export default class Main extends React.Component {
  static propTypes = {
    store: PropTypes.any.isRequired,
    routes: PropTypes.any.isRequired,
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <div style={{ height: '100%' }}>
              <Router history={history} children={this.props.routes} />
            </div>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    )
  }
}
