import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Flex, Box } from "rebass";
import { space, layout, typography } from "styled-system";
import Head from "next/head";

const Page = styled.div`
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
  margin-top: 10px;
`;

const Footer = styled.div({}, space);

const FooterLinks = styled.div(
  {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  space
);

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

const H2 = styled.h2(
  {
    fontSize: "24px",
    color: "white",
    fontWeight: 600,
  },
  typography,
  space
);

const P = styled.p({ fontWeight: 300 }, typography);

const H3 = styled.h2`
  font-size: 24px;x
  font-weight: 700;
  margin: 40px 0 10px;
`;

const Cover = styled.div`
  position: relative;
  & picture img {
    width: 100%;
    // filter: brightness(0.8);
    // transform: scale(1);
  }
`;

const CoverText = styled.div(
  {
    boxSizing: "border-box",
    borderRadius: "0 5px 5px 0",
    justifyContent: "center",
    color: "white",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    backdropFilter: "blur(2px)",
    background: "rgba(0, 0, 0, 0.3)",
  },
  space,
  layout
);

const Topbar = styled.div`
  width: 100%;
  padding: 5px;
  height: 100%;
`;

const Logo = styled.div``;

const LogoIcon = styled.img({}, space, layout);

const Logotype = styled.h1`
  font-weight: 300;
  margin: 2px 0 0 0;
  color: black;
  & strong {
    color: rgb(51, 134, 255);
  }
`;

const Menu = styled.ul(
  {
    listStyle: "none",
    margin: 0,
  },
  space,
  layout,
  typography
);

const MenuItem = styled.li`
  float: left;
  margin-right: 20px;
  & a {
    text-decoration: none;
  }
`;

const Homepage = () => (
  <>
    <Head>
      <title>Open Facilitation: find a facilitor for your next event</title>
      <meta
        name="description"
        content="Directory of facilitators for your online/offline needs"
      />
      <meta
        property="og:image"
        content="https://openfacilitation.com/images/openfacilitation-preview.jpg"
      />
    </Head>
    <Topbar>
      <Logo>
        <Flex alignItems="center">
          <LogoIcon
            src="/images/openfacilitation-logo.svg"
            width={[48, 52, 64]}
            ml={[2, 3]}
            mr={[1, 1]}
          />
          <Box fontSize={["12px", "14px", "16px"]}>
            <Logotype>
              Open <strong>Facilitation</strong>
            </Logotype>
          </Box>
        </Flex>
      </Logo>
    </Topbar>
    <Cover>
      <picture>
        <source
          type="image/avif"
          srcset="/images/openfacilitation-cover.avif"
        />
        <source
          type="image/webp"
          srcset="/images/openfacilitation-cover.webp"
        />
        <img
          alt="open facilitation cover"
          src="/images/openfacilitation-cover.jpg"
        />
      </picture>
      <CoverText
        mt={[0, 5, 5]}
        ml={0}
        width={["100%", "50%", "40%"]}
        p={[3, 3, 4]}
      >
        <H2 fontSize={["18px", "20px", "28px"]} my={[2, 2, 3]}>
          Find a facilitator for your next event
        </H2>
        <P fontSize={["13px", "14px", "16px"]}>
          Whether you are organising a general assembly online or offline, a
          brainstorming, a team building or retreat, we can help you find the
          right person.
        </P>
        <Button
          color="primary"
          variant="contained"
          href="/request"
          size="medium"
          disableElevation
        >
          Post your request
        </Button>
      </CoverText>
    </Cover>
    <Page>
      <center>
        <About>
          <H3>A Community of Facilitators</H3>
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
          <Button
            color="primary"
            variant="outlined"
            href="/directory"
            disableElevation
          >
            Browse the directory
          </Button>

          <H3>Join our community</H3>
          <p>
            Are you a facilitator? Join our community to increase your
            visibility, learn from fellow facilitators and find new
            opportunities.
            <Flex justifyContent="center">
              <Box mt={3}>
                <Button
                  color="primary"
                  variant="outlined"
                  href="/join"
                  disableElevation
                >
                  REGISTER AS A FACILITATOR
                </Button>
              </Box>
            </Flex>
          </p>
        </About>

        <Footer mt={60}>
          <FooterLinks>
            <FooterLink href="https://docs.openfacilitation.com">
              Documentation
            </FooterLink>
            <FooterLink href="https://docs.openfacilitation.com/membership">
              Membership
            </FooterLink>
            <FooterLink href="/directory">Directory</FooterLink>
            <FooterLink href="https://www.facebook.com/Open-Facilitation-107301451109828/">
              Facebook
            </FooterLink>
            <FooterLink href="mailto:info@openfacilitation.com">
              Email
            </FooterLink>
          </FooterLinks>

          <Fineprint>Open Facilitation</Fineprint>
        </Footer>
      </center>
    </Page>
  </>
);

export default Homepage;
