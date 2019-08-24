import { ApolloProvider } from "@apollo/react-hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { NextComponentType, NextPageContext } from "next";
import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import "../scss/styles.scss";
import theme from "../theme";

class MyApp extends App {
  public componentDidMount() {
    const jssStyles: Element | null = document.querySelector(
      "#jss-server-side"
    );
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  public render() {
    // @ts-ignore
    const {
      Component,
      pageProps,
      apolloClient
    }: {
      Component: NextComponentType<NextPageContext, any, {}>;
      pageProps: any;
      apolloClient: any;
    } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
