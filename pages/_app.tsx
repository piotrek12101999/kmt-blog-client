import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { NextComponentType, NextPageContext } from "next";
import App from "next/app";
import Head from "next/head";
import React from "react";
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
    const {
      Component,
      pageProps
    }: {
      Component: NextComponentType<NextPageContext, any, {}>;
      pageProps: any;
    } = this.props;

    return (
      <>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
