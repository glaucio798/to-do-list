import React from 'react';
import Router from './router';
import client from './graphql/client';
import { ApolloProvider } from '@apollo/react-hooks'
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
