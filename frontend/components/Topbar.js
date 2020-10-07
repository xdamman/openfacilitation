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
  cursor: pointer;
`;

const Topbar = styled.div`
  height: 56px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
`;

export default ({ title }) => {
  return (
    <Topbar>
      <Flex alignItems="center">
        <Box mt={1} mr={2}>
          <Link href="/">
            <A title="Go back to openfacilitation.com">
              <Logo
                src="/images/openfacilitation-logo.svg"
                alt="openfacilitation logo"
              />
            </A>
          </Link>
        </Box>
        <Box mr={2}>
          <H1>{title}</H1>
        </Box>
        <Box>
          <Link href="/">
            <A>
              <H2>Open Facilitation</H2>
            </A>
          </Link>
        </Box>
      </Flex>
    </Topbar>
  );
};
