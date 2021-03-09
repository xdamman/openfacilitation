import styled from "styled-components";
import FacilitatorRow from "../components/FacilitatorRow";
import { Flex, Box } from "rebass";
import { getData, join } from "../lib/data";
import Tags from "../components/Tags";
import Topbar from "../components/Topbar";
import Events from "../components/Events";
import { Avatar } from "../components/Avatar";
import { pluralize } from "../lib/helpers";
import StickyBox from "react-sticky-box";
import FooterButton from "../components/FooterButton";
import Markdown from "react-markdown";
import Link from "next/link";
import Head from "next/head";

const Page = styled.div`
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
  padding: 0;
  font-family: Content-font, Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.625;
  font-size: 16px;
`;

const H2 = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
  margin: 50px 0 0px;
`;

const Description = styled.p`
  margin: 10px;
`;

const PageComponent = ({ facilitator }) => {
  if (!facilitator) {
    return <div></div>;
  }

  return (
    <Page>
      <Head>
        <title>{facilitator.name} - Open Facilitation</title>
        <meta
          name="description"
          content="Directory of facilitators for your online/offline needs"
        />
        <meta
          property="og:image"
          content="https://openfacilitation.com/images/openfacilitation-preview.jpg"
        />
      </Head>
      <center>
        <StickyBox>
          <Topbar title={facilitator.name} />
        </StickyBox>
        <Box my={5}>
          <Avatar src={facilitator.picture.large} width={128} />
        </Box>
        <Box my={4} mx={2}>
          <Description>{facilitator.description}</Description>
          {facilitator.website && (
            <Box my={1} mx={2}>
              <Link href={facilitator.website}>{facilitator.website}</Link>
            </Box>
          )}
        </Box>
        <Flex flexDirection="column">
          <Tags
            array={facilitator.meetingTypes}
            styles={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          {facilitator.longDescription &&
            facilitator.longDescription.length > 2 && (
              <Box my={4} mx={2}>
                <Description>
                  <Markdown source={facilitator.longDescription} />
                </Description>
              </Box>
            )}
          {facilitator.events && facilitator.events.length > 0 && (
            <Box>
              <H2>
                {facilitator.events.length}{" "}
                {pluralize("Event", facilitator.events.length)} Facilitated
              </H2>
              <Events events={facilitator.events} />
            </Box>
          )}
          {facilitator.email && (
            <Box mt={4} mb={6}>
              <FooterButton
                label={`Get in touch with ${facilitator.name}`}
                href={`mailto:${facilitator.email}?subject=${encodeURIComponent(
                  "Get in touch via openfacilitation.com"
                )}`}
              />
            </Box>
          )}
        </Flex>
      </center>
    </Page>
  );
};

export async function getServerSideProps({ params, req, res }) {
  const languages = await getData("Languages");
  const meetingTypes = await getData("Types");
  let facilitator = await getData("Facilitators", {
    slug: params.facilitatorSlug,
  });
  console.log(
    ">>> loading facilitator",
    params.facilitatorid,
    "result:",
    facilitator
  );
  if (!facilitator || !facilitator.name) {
    console.error(
      "Cannot find facilitator with that slug",
      params.facilitatorSlug
    );
    return { props: {} };
  }

  const eventsTable = await getData("Events", {
    facilitator: facilitator.name,
  });
  const clients = await getData("Clients", {
    facilitator: facilitator.name,
  });
  const events = join(eventsTable, "client", clients);

  facilitator = join(
    join(
      join([facilitator], "languages", languages, "name"),
      "meetingTypes",
      meetingTypes,
      "name"
    ),
    "events",
    events
  )[0];

  // console.log(">>> after join facilitator", facilitator);
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  return {
    props: { facilitator },
  };
}

export default PageComponent;
