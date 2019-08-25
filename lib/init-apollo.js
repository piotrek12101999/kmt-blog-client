import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create(initialState) {
  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    // tslint:disable-next-line: object-literal-sort-keys
    link: new HttpLink({
      fetch: !isBrowser && fetch,
      uri: 'https://kmt-blog-api.piotrek12101999.now.sh/'
    }),
    cache: new InMemoryCache().restore(initialState),
    resolvers: {
      Query: {
        test: () => 'nowa proba'
      }
    }
  });
}

export default function initApollo(initialState) {
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
