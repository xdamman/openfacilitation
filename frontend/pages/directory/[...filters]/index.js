import styled from "styled-components";
import Topbar from "../../../components/Topbar";
import SearchForm from "../../../components/SearchForm";
import FacilitatorRow from "../../../components/FacilitatorRow";
import { Flex, Box } from "rebass";
import { getData, join } from "../../../lib/data";
import Link from "next/link";
import { useRouter } from "next/router";

const A = styled.a`
  text-decoration: none;
  display: block;
  width: 100%;
  cursor: pointer;
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
      "/directory/[...filters]",
      `/directory/${filters.language || "all"}/${filters.type || "any"}`
    );
  };

  const hasResults = facilitators && facilitators.length > 0;
  const results = (
    <div>
      {!hasResults && <center>No facilitator found</center>}
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
    <>
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
    </>
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
    revalidate: 180,
  };
}

export async function getStaticPaths() {
  const languages = await getData("Languages");
  const meetingTypes = await getData("Types");
  const paths = [];

  languages.map((l) => {
    paths.push({ params: { filters: [l.name] } });
    meetingTypes.map((m) => {
      paths.push({ params: { filters: [l.name, m.name] } });
    });
  });

  return {
    paths,
    fallback: true,
  };
}
