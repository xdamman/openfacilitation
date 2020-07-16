import moment from "moment";
import { Flex, Box } from "rebass";
import styled from "styled-components";

const EventEntry = styled.div`
  margin: 50px 0;
`;

const EventTitle = styled.h1`
  font-weight: normal;
  font-size: 16pt;
  margin-bottom: 0;
  color: #222;
`;

const Picture = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 10px 0 5px 0;
`;

const Metadata = styled.div`
  color: #444;
  margin: 0 0 10px 0;
  font-size: 10pt;
  a {
    text-decoration: none;
  }
`;

const Date = styled.span``;
const Organiser = styled.span``;
const Description = styled.p`
  margin-top: 0;
  padding: 10px;
  color: #333;
`;

export default ({ events }) => {
  if (!events || events.length === 0) return <span />;
  return (
    <div>
      {events.map((event) => (
        <EventEntry>
          <EventTitle>{event.name}</EventTitle>
          <Metadata>
            <span>{moment(event.startDate).format("MMMM Do YYYY")}</span>
            {event.client[0] && (
              <span>
                , organised by{" "}
                <a href={event.client[0].website}>{event.client[0].name}</a>
              </span>
            )}
            {event.attendees && <span>, {event.attendees} attendees</span>}
          </Metadata>
          {event.picture.large && (
            <Box>
              <Picture src={event.picture.large} />
            </Box>
          )}
          <Box>
            <Description>{event.description}</Description>
          </Box>
        </EventEntry>
      ))}
    </div>
  );
};
