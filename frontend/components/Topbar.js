import styled from "styled-components";
import { Flex, Box } from "rebass";
import Link from "next/link";

const Logo = styled.img`
  height: 48px;
`;

const H1 = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 14px;
  font-weight: normal;
`;

const A = styled.a`
  text-decoration: none;
`;

const Topbar = styled.div``;

export default ({ title }) => {
  return (
    <Topbar>
      <Flex alignItems="center">
        <Box mt={1} mr={2}>
          <Link href="/">
            <A>
              <Logo src="/images/openfacilitation-logo.png" />
            </A>
          </Link>
        </Box>
        <Box mr={2}>
          <H1>
            <Link href="/">
              <A>Open Facilitation</A>
            </Link>
          </H1>
        </Box>
        <Box>
          <H2>{title}</H2>
        </Box>
      </Flex>
    </Topbar>
  );
};
