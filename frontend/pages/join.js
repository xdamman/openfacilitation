import React, { Component, useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const Page = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

class Airtable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <Topbar title="Join our collective" />
        <iframe
          className="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shrDhK4QdTe0lyFTM?backgroundColor=orange"
          frameBorder="0"
          onMouseWheel=""
          width="100%"
          height="2010"
          style={{ background: "transparent", border: "1px solid #ccc;" }}
        />
      </Page>
    );
  }
}

export default Airtable;
