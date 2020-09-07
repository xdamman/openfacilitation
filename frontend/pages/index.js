import styled from "styled-components";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { Flex, Box } from "rebass";

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
  border-radius: 5px;
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

const Homepage = () => (
  <Body>
    <center>
      <img src="/images/openfacilitation-logo.png" />

      <About>
        <H2>Find a facilitator for your next event</H2>
        <p>
          Whether you are organising a general assembly online or offline, a
          brainstorming, a team building or retreat, we can help you find the
          right person. Browse our directory or directly{" "}
          <Link href="/request">submit a request</Link> for your event. Based on
          your request we will look for the best facilitator for your needs
        </p>
        <Flex justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            href="/directory"
            disableElevation
          >
            Directory of facilitators
          </Button>
        </Flex>

        <H2>A Community of Facilitators</H2>
        <p>
          Facilitators are passionate about helping groups/teams reach their
          full potential. They are experts in creating and moderating spaces
          where people can meet, work, solve conflicts or take decisions
          together. They have a feel for group dynamics and are excellent
          listeners.
        </p>
        <p>
          To promote their work and improve their visibility, we built a
          directory of facilitators. All facilitators have their own style and
          expertise. This directory will make it easier to find the right
          facilitator and to hire one of us.
        </p>

        <H2>Join our community</H2>
        <p>
          Are you a facilitator? Join our community to increase your visibility,
          learn from fellow facilitators and find new opportunities.{" "}
          <Link href="https://docs.openfacilitation.com/membership">
            More information about membership plans
          </Link>
          .
          <Flex justifyContent="center">
            <Box mt={3}>
              <Button
                color="primary"
                variant="outlined"
                href="/join"
                disableElevation
              >
                Apply to join our collective
              </Button>
            </Box>
          </Flex>
        </p>
      </About>

      <Footer>
        <FooterLink href="https://docs.openfacilitation.com">
          Documentation
        </FooterLink>
        <FooterLink href="https://docs.openfacilitation.com/membership">
          Membership
        </FooterLink>
        <FooterLink href="https://www.facebook.com/Open-Facilitation-107301451109828/">
          Facebook Page
        </FooterLink>
        <FooterLink href="mailto:info@openfacilitation.com">Email</FooterLink>
        <br />
        <Fineprint>Open Facilitation</Fineprint>
      </Footer>
    </center>
  </Body>
);

export default Homepage;
