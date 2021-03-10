import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Flex, Box } from "rebass";
import { space, layout, typography } from "styled-system";
import Head from "next/head";

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const PageContent = styled.div`
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
  margin-top: 0px;
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
    lineHeight: 1.2,
    color: "white",
    fontWeight: 600,
  },
  typography,
  space
);

const P = styled.p({ fontWeight: 300 }, typography);

const H3 = styled.h3`
  font-size: 24px;
  line-height: 1.2;
  font-weight: 700;
  margin: 40px 0 0px;
`;

const H4 = styled.h4`
  font-size: 18px;
  font-weight: 300;
  margin: 20px 0 10px;
`;

const TopContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
`;

const Cover = styled.div(
  {
    marginTop: "30px",
    textAlign: "center",
    "& picture img": {
      width: "100%",
      maxWidth: "600px",
    },
  },
  space,
  layout
);

const CoverText = styled.div(
  {
    maxWidth: "660px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  space,
  layout,
  typography
);

const Topbar = styled.div`
  width: 100%;
  padding: 5px;
  height: 100%;
  margin: 20px 0;
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
    <Page>
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
      <TopContent>
        <Cover width={[1, 1, 1 / 2]}>
          <picture>
            <source
              type="image/avif"
              srcset="/images/openfacilitation-mosaic.avif"
            />
            <source
              type="image/webp"
              srcset="/images/openfacilitation-mosaic.webp"
            />
            <img
              alt="open facilitation mosaic"
              src="/images/openfacilitation-mosaic.jpg"
            />
          </picture>
        </Cover>
        <CoverText
          width={[1, 1, 1 / 2.5]}
          mx={[2, 2, 4]}
          textAlign={["center", "center", "left"]}
        >
          <H3>Find a facilitator for your next event</H3>
          <p>
            Whether you are organising a general assembly online or offline, a
            brainstorming, a team building or retreat, we can help you find the
            right person.
          </p>
          <Box mt={0}>
            <Button
              color="primary"
              variant="contained"
              href="/request"
              size="medium"
              disableElevation
            >
              Post your request
            </Button>
          </Box>

          <H3>Join our community</H3>
          <p>
            Are you a facilitator? Join our community to increase your
            visibility, learn from fellow facilitators and find new
            opportunities.
          </p>
          <Box mt={0}>
            <Button
              color="primary"
              variant="outlined"
              href="/join"
              disableElevation
            >
              REGISTER AS A FACILITATOR
            </Button>
          </Box>
        </CoverText>
      </TopContent>
      <PageContent>
        <center>
          <About>
            <H3>About</H3>
            <H4>A Community of Facilitators</H4>
            <p>
              Facilitators are passionate about helping groups/teams reach their
              full potential. They are experts in creating and moderating spaces
              where people can meet, work, solve conflicts or take decisions
              together. They have a feel for group dynamics and are excellent
              listeners.
            </p>
            <p>
              To promote their work and improve their visibility, we built a
              directory of facilitators. All facilitators have their own style
              and expertise. This directory will make it easier to find the
              right facilitator and to hire one of us.
            </p>
            <Button
              color="primary"
              variant="outlined"
              href="/directory"
              disableElevation
            >
              Browse the directory
            </Button>
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
      </PageContent>
    </Page>
  </>
);

export default Homepage;
