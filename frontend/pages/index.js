import styled from "styled-components";
import Link from "next/link";

const Body = styled.div`
  max-width: 660px;
  margin: 0 auto;
  font-family: Content-font, Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.625;
  font-size: 16px;
  padding: 10px;
`;

const Links = styled.div`
  padding: 0;
  margin: 0;
`;

const StyledLink = styled.a`
  text-decoration: none;
  display: block;
  margin: 15px 0;
  border: 1px solid #4a7a84;
  border-radius: 5px;
  min-width: 250px;
  max-width: 300px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background: #eee;
  }
`;

const About = styled.div`
  margin: 50px 0;
`;

const Footer = styled.div``;

const FooterLink = styled.a`
  text-decoration: none;
  margin-right: 20px;
  font-size: 11pt;
`;

const Label = styled.span`
  color: #555;
  margin-right: 20px;
`;
const Fineprint = styled.span`
  color: #555;
  font-size: 9pt;
  margin-right: 20px;
`;

const H2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 10px;
`;

export default () => (
  <Body>
    <center>
      <img src="/images/openfacilitation-logo.png" />
      <Links>
        <Link href="/facilitators">
          <StyledLink>Directory of facilitators</StyledLink>
        </Link>
        <StyledLink href="https://airtable.com/shrDhK4QdTe0lyFTM">
          Apply to join our collective
        </StyledLink>
      </Links>

      <About>
        <H2>Find a facilitator for your next event</H2>
        <p>
          Whether you are organising a general assembly online or offline, a
          brainstorming, a team retreat, we can help you find the right person.
          Browse our directory or directly submit a request for your event.
        </p>

        <H2>A Community of Facilitators</H2>
        <p>
          We are facilitators and while we love what we do, we find it difficult
          to make a living with it. So we decided to get together to build a
          directory of facilitators, improve our visibility and make it easier
          for potential customers to hire one of us based on their needs.
        </p>

        <H2>Join our community</H2>
        <p>
          You are a facilitator? Join our community to increase your visibility,
          learn from fellow facilitators and find new opportunities.
        </p>
      </About>

      <Footer>
        <Label>Find us on:</Label>
        <FooterLink href="https://opencollective.com/openfacilitation">
          Open Collective
        </FooterLink>
        <FooterLink href="https://github.com/xdamman/openfacilitation">
          GitHub
        </FooterLink>
        <FooterLink href="mailto:info@openfacilitation.com">Email</FooterLink>
        <br />
        <Fineprint>Open Facilitation, xdamman SPRL, Brussels</Fineprint>
      </Footer>
    </center>
  </Body>
);
