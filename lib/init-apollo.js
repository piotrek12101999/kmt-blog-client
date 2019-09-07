import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

let apolloClient = null;

function create(initialState) {
  const isBrowser = typeof window !== 'undefined';

  const httpLink = new HttpLink({ fetch: !isBrowser && fetch, uri: 'https://kmt-blog-api.piotrek12101999.now.sh/' });

  const authLink = new ApolloLink((operation, forward) => {
    const token = Cookies.get('token') ? `Bearer ${Cookies.get('token')}` : '';

    operation.setContext({
      headers: {
        authorization: token
      }
    });

    return forward(operation);
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    // tslint:disable-next-line: object-literal-sort-keys
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
    resolvers: {
      Query: {
        auth: () => {
          const isUserAlreadyLoggedIn = Cookies.get('uid');
          console.log(isUserAlreadyLoggedIn);
          if (isUserAlreadyLoggedIn) {
            return true;
          }

          return false;
        }
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
