import styled from "styled-components";
import { Button } from "@material-ui/core";

const FixedFooter = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  width: 100%;
  padding: 15px 0;
`;

export default ({ label, href }) => {
  return (
    <FixedFooter>
      <Button color="primary" variant="contained" href={href} disableElevation>
        {label || "Get in touch"}
      </Button>
    </FixedFooter>
  );
};
