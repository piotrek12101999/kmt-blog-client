import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(() => {
      if (apolloClient) {
        return apolloClient;
      }

      return initApolloClient(apolloState, {
        getToken: () => {
          return parseCookies().token;
        }
      });
    }, []);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;

    WithApollo.propTypes = {
      apolloClient: PropTypes.object,
      apolloState: PropTypes.object
    };
  }

  WithApollo.getInitialProps = async ctx => {
    const { AppTree, req, res } = ctx;

    const apolloClient = (ctx.apolloClient = initApolloClient(
      {},
      {
        getToken: () => parseCookies(req).token
      }
    ));

    const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

    if (res && res.finished) {
      return {};
    }

    if (typeof window === 'undefined') {
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error);
      }

      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState
    };
  };

  return WithApollo;
}

let apolloClient = null;

function initApolloClient(...args) {
  if (typeof window === 'undefined') {
    return createApolloClient(...args);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(...args);
  }

  return apolloClient;
}

function createApolloClient(initialState = {}, { getToken }) {
  const fetchOptions = {};

  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(process.env.https_proxy);
    }
  }

  const httpLink = new HttpLink({
    uri: 'https://kmt-blog-api.piotrek12101999.now.sh/',
    credentials: 'same-origin',
    fetch,
    fetchOptions
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const isBrowser = typeof window !== 'undefined';

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
    resolvers: {
      Mutation: {
        UserLocalData: (_, { uid }, { cache }) => {
          cache.writeData({ uid });
          return null;
        }
      }
    }
  });
}

function parseCookies(req, config = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, config);
}
