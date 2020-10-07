import styled from "styled-components";

export const Avatar = styled.div`
  border-radius: 50%;
  border: 3px solid #9ccafe;
  max-height: 128px;
  width: ${(props) => props.width || 64}px;
  height: ${(props) => props.width || 64}px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default ({ src, width }) => {
  return <Avatar src={src} width={width} />;
};
