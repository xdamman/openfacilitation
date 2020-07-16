import styled from "styled-components";
import Topbar from "../components/Topbar";
import SearchForm from "../components/SearchForm";
import FacilitatorRow from "../components/FacilitatorRow";
import { Flex, Box } from "rebass";
import { getData, join } from "../lib/data";
import Link from "next/link";
import { useRouter } from "next/router";

const Body = styled.div`
  max-width: 900px;
  margin: 0 auto;
  font-family: Content-font, Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.625;
  font-size: 16px;
  overflow-x: hidden !important;
`;

const A = styled.a`
  text-decoration: none;
  display: block;
  width: 100%;
  cursor: pointer;
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

const H2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 10px;
`;

const ResultNumbers = styled.div`
  text-transform: uppercase;
  color: #333;
`;

export default ({ facilitators, languages, meetingTypes, query }) => {
  const router = useRouter();
  const handleChange = (filters) => {
    // console.log(">>> handleChange", filters);
    router.push(
      "/[...filters]",
      `/${filters.language || "all"}/${filters.type || "any"}`
    );
  };

  const hasResults = facilitators && facilitators.length > 0;
  const results = (
    <div>
      {!hasResults && <div>No facilitator found</div>}
      {hasResults && (
        <>
          <Box ml={3}>
            <ResultNumbers>
              {facilitators.length} facilitator
              {facilitators.length > 1 ? "s" : ""} found
            </ResultNumbers>
          </Box>
          <Flex flexWrap="wrap">
            {facilitators.map((node) => (
              <Link href={`/profiles/${node.id}`}>
                <A>
                  <FacilitatorRow data={node} />
                </A>
              </Link>
            ))}
          </Flex>
        </>
      )}
    </div>
  );

  return (
    <Body>
      <Topbar title="Find a facilitator" />
      <Box ml={2}>
        <SearchForm
          languages={languages}
          types={meetingTypes}
          defaultValue={query}
          onChange={(filters) => handleChange(filters)}
        />
      </Box>
      <Box mt={4}>{results}</Box>
    </Body>
  );
};

export async function getStaticProps({ params }) {
  console.log(">>> params", params);

  const query = {};
  if (params) {
    if (params.filters[0]) {
      query.language = params.filters[0];
    }
    if (params.filters[1]) {
      query.type = params.filters[1];
    }
  }

  console.log(">>> query", query);
  const languages = await getData("Languages");
  const meetingTypes = await getData("Types");
  let facilitators = await getData("Facilitators", query);
  if (facilitators && facilitators.length > 0) {
    facilitators = join(
      join(facilitators, "languages", languages, "name"),
      "meetingTypes",
      meetingTypes,
      "name"
    );
  }
  facilitators = facilitators.filter((f) => f.name && f.email);
  console.log(`>>> ${facilitators.length} facilitators found`);

  return {
    props: { query, languages, facilitators, meetingTypes },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 180 seconds
    unstable_revalidate: 180,
  };
}
