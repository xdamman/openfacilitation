import React, { Component, useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const Page = styled.div`
  max-width: 660px;
  margin: 0 auto;
`;

const Embed = styled.div`
  z-index: 0;
  overflow: hidden;
  displpay: block;
  height: 100%;
  width: 100%;
  iframe {
    z-index: 0;
    position: absolute;
    top: 54px;
    left: 0;
    width: 100vw;
    max-width: 100%;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch !important;
  }
`;

class Airtable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Topbar title="Submit a request" />
        <Embed>
          <iframe
            className="airtable-embed airtable-dynamic-height"
            src="https://airtable.com/embed/shry4hbRGeUkqKF2b?backgroundColor=orange"
            frameBorder="0"
            onMouseWheel=""
            style={{ height: "100vh" }}
          />
        </Embed>
      </Page>
    );
  }
}

export default Airtable;
