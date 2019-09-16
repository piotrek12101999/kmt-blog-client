import { ThemeProvider } from "@material-ui/styles";
import { NextComponentType, NextPageContext } from "next";
import App from "next/app";
import React from "react";
import theme from "../theme";

class MyApp extends App {
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
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
