import { ServerStyleSheets } from "@material-ui/styles";
import { DocumentInitialProps, RenderPage } from "next-server/dist/lib/utils";
import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import theme from "../theme";

class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets: ServerStyleSheets = new ServerStyleSheets();
  const originalRenderPage: RenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps: DocumentInitialProps = await Document.getInitialProps(
    ctx
  );

  return {
    ...initialProps,
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  };
};

export default MyDocument;
