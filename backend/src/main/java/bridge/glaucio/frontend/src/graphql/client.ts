import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import cache from './cache'

import { RequestListenerLink } from './RequestListenerLink'

const link = ApolloLink.from([
  new RequestListenerLink(),
  new HttpLink({ uri: "http://localhost:9000/graphql"})
])

const client = new ApolloClient({
  cache,
  name: 'ToDoList',
  link: link
})

export default client;