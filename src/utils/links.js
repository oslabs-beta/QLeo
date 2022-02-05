import { ApolloLink, from, HttpLink } from '@apollo/client';

const ForwardExtensionsLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    if (response.data) {
      response.data.extensions = response.extensions;
    }
    return response;
  })
);

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/'
});

export const linksChain = from([ForwardExtensionsLink, httpLink]);