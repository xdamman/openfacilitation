import App from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
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