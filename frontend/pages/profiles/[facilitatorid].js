import styled from "styled-components";
import FacilitatorRow from "../../components/FacilitatorRow";
import { Flex, Box } from "rebass";
import { getData, join } from "../../lib/data";
import { Button } from "@material-ui/core";
import Tags from "../../components/Tags";
import Topbar from "../../components/Topbar";
import Events from "../../components/Events";

const Body = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  font-family: Content-font, Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.625;
  font-size: 16px;
`;

const H2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 10px;
`;

const Avatar = styled.img`
  max-height: 128px;
  border-radius: 100%;
  margin: 30px 0;
`;

const Description = styled.p`
  margin: 10px;
`;

export default ({ facilitator }) => {
  if (!facilitator) {
    return <div></div>;
  }
  return (
    <Body>
      <center>
        <Topbar title={facilitator.name} />
        <Avatar src={facilitator.picture.large} />
        <Description>{facilitator.description}</Description>
        <Flex flexDirection="column">
          <Tags
            array={facilitator.meetingTypes}
            styles={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
          {facilitator.events && facilitator.events.length > 0 && (
            <Box>
              <H2>Events facilitated</H2>
              <Events events={facilitator.events} />
            </Box>
          )}
          {facilitator.email && (
            <Box mt={4}>
              <Button
                color="primary"
                variant="contained"
                href={`mailto:${facilitator.email}?subject=${encodeURIComponent(
                  "Get in touch via openfacilitation.com"
                )}`}
              >
                Get in touch
              </Button>
            </Box>
          )}
        </Flex>
      </center>
    </Body>
  );
};

export async function getStaticProps({ params }) {
  const languages = await getData("Languages");
  const meetingTypes = await getData("Types");
  let facilitator = await getData("Facilitators", { id: params.facilitatorid });
  console.log(
    ">>> loading facilitator",
    params.facilitatorid,
    "result:",
    facilitator
  );
  if (!facilitator || !facilitator.name) {
    console.error("Cannot find facilitator with that id", params.facilitatorid);
    return { props: {} };
  }

  const eventsTable = await getData("Events", {
    facilitator: facilitator.name,
  });
  const clients = await getData("Clients", {
    facilitator: facilitator.name,
  });
  const events = join(eventsTable, "client", clients);
  console.log(">>> events", events);
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

  return {
    props: { facilitator },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 180 seconds
    unstable_revalidate: 180,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { facilitatorid: "recfUcYOMkEuJGncv" } },
      { params: { facilitatorid: "recT8S6I9nV88rHa1" } },
      { params: { facilitatorid: "rec6t4wMI1lLUv60c" } },
      { params: { facilitatorid: "recNTugJhswCLFztA" } },
      { params: { facilitatorid: "recWc3MUQ9wm908H9" } },
    ],
    fallback: true,
  };
}
