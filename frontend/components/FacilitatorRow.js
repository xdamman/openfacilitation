import styled from "styled-components";
import { Flex, Box } from "rebass";
import numeral from "../lib/numeral";
import { Icon } from "../styles";
import Avatar from "../components/Avatar";
import Tags from "./Tags";
import Link from "next/link";

const Row = styled.div`
  width: 100%;
  float: left;
  text-align: left;
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  font-size: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const Description = styled.p`
  font-size: 14px;
  overflow: hidden;
  color: #222;
  line-height: 1.4;
  margin: 5px 0;
`;

const A = styled.a`
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: 100%;
  &:hover {
    > div {
      border-radius: 5px;
      background: #eee;
    }
  }
`;

const Metadata = styled.div`
  font-size: 10pt;
  color: #444;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-right: 10px;
  }
`;

const MeetingTypes = styled.div`
  width: 100%;
`;

function showData(data) {
  const res = [];
  if (data.city) res.push(data.city);
  if (data.languages) res.push(data.languages.join(", "));
  if (data.meetingTypes) res.push(data.meetingTypes.join(", "));
  return res.join(", ");
}

const Component = ({ data }) => {
  const href = data.slug ? `/${data.slug}` : `/profiles/${data.id}`;
  return (
    <Box mx={1}>
      <Link href={href}>
        <A>
          <Row>
            <Flex>
              <div>
                <Avatar
                  src={data.picture.large || "/images/avatar.png"}
                  width={64}
                />
              </div>
              <Box ml={2}>
                <H1>{data.name}</H1>
                <Metadata>
                  {data.city && (
                    <div>
                      <Icon src="/images/icons/location.png" />
                      {data.city}
                    </div>
                  )}
                  {data.languages && (
                    <div>
                      <Icon src="/images/icons/lang.png" />
                      {data.languages.join(", ")}
                    </div>
                  )}
                  {data.meetingTypes && (
                    <MeetingTypes>
                      <Icon src="/images/icons/zoom.png" />
                      <Tags array={data.meetingTypes} />
                    </MeetingTypes>
                  )}
                </Metadata>
                <Description>{data.description}</Description>
              </Box>
            </Flex>
          </Row>
        </A>
      </Link>
    </Box>
  );
};

export default Component;
