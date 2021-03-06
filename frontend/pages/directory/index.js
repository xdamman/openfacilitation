import styled from "styled-components";
import Topbar from "../../components/Topbar";
import SearchForm from "../../components/SearchForm";
import FacilitatorRow from "../../components/FacilitatorRow";
import { Flex, Box } from "rebass";
import { getData, join } from "../../lib/data";
import { useRouter } from "next/router";
import FooterButton from "../../components/FooterButton";
import Head from "next/head";

const Page = styled.div`
  max-width: 660px;
  margin: 0 auto;
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

const Directory = ({
  facilitators,
  languages,
  meetingTypes,
  cities,
  query,
}) => {
  const router = useRouter();
  const handleChange = (filters) => {
    // console.log(">>> handleChange", filters);
    let route = `/directory/${filters.city || "anywhere"}/${
      filters.language || "any"
    }/${filters.type || "any"}`;
    // route = route.replace(/(\/any(where)?)+$/, "");
    route = route.replace(/(\/any)+$/, "");
    router.push("/directory/[...filters]", route);
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
          <Flex flexWrap="wrap" mb={5}>
            {facilitators.map((node, i) => (
              <FacilitatorRow data={node} key={i} />
            ))}
          </Flex>
        </>
      )}
    </div>
  );

  return (
    <Page>
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
      <Topbar title="Find a facilitator" />
      <Box ml={2}>
        <SearchForm
          languages={languages}
          types={meetingTypes}
          cities={cities}
          defaultValue={query}
          onChange={(filters) => handleChange(filters)}
        />
      </Box>
      <Box mt={4}>{results}</Box>
      <FooterButton label="Submit a request" href="/request" />
    </Page>
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
  const cities = await getData("Facilitators", {
    view: "Cities",
    fields: ["Country", "City"],
    distinct: "City",
  });
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
    props: { query, languages, facilitators, meetingTypes, cities },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 180 seconds
    revalidate: 180,
  };
}

export default Directory;
