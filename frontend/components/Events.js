import moment from "moment";
import { Flex, Box } from "rebass";
import styled from "styled-components";

const EventEntry = styled.div`
  margin-top: 20px;
`;

const Picture = styled.img`
  max-width: 100%;
`;

const Metadata = styled.div`
  color: #444;
  font-size: 10pt;
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
  }
`;

const Date = styled.div``;
const Organiser = styled.div``;
const Description = styled.p`
  margin-top: 0;
  color: #222;
`;

export default ({ events }) => {
  if (!events || events.length === 0) return <span />;
  return (
    <EventEntry>
      {events.map((event) => (
        <div>
          <Box>
            <b>{event.name}</b>
          </Box>
          <Metadata>
            <Date>{moment(event.startDate).format("MMMM Do YYYY")}</Date>
            {event.client[0] && (
              <Organiser>
                , organised by{" "}
                <a href={event.client[0].website}>{event.client[0].name}</a>
              </Organiser>
            )}
            {event.attendees && <div>, {event.attendees} attendees</div>}
          </Metadata>
          {event.picture.large && (
            <Box>
              <Picture src={event.picture.large} />
            </Box>
          )}
          <Box>
            <Description>{event.description}</Description>
          </Box>
        </div>
      ))}
    </EventEntry>
  );
};
