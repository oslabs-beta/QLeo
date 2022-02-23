import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { linksChain } from './utils/links';

import App from './components/App';

// Create a new apollo client for doing graphql request and get the customized performance data
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: linksChain
});


// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
const root = document.createElement('div');

// set an id for root and append it to the DOM document
root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
