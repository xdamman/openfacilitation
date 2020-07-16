import App from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    max-width: 660px;
    margin: 0 auto;
    font-family: Content-font, Roboto, sans-serif;
    font-weight: 400;
    line-height: 1.625;
    font-size: 16px;
    overflow-x: hidden !important;
    position: relative;
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
