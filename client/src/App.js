import React, { Component } from 'react'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import BookList from './components/BookList';
import * as constants from './constants.js'

const client = new ApolloClient({uri:constants.GQL_SERVER_URI})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList></BookList>
        </div>
      </ApolloProvider>
    )
  }
}

export default App;