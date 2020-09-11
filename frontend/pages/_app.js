import App from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Content-font, Roboto, sans-serif;
    font-weight: 400;
    line-height: 1.625;
    font-size: 16px;
    overflow-x: hidden !important;
    position: relative;
  }

  a {
    text-decoration: none;
  }
`;

let theme = createMuiTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    primary: {
      main: "rgb(51,134,255)",
    },
    secondary: {
      main: "rgb(153,202,255)",
    },
  },
});

theme = responsiveFontSizes(theme);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/images/openfacilitation-icon.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <GlobalStyle />
      </>
    );
  }
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
