import styled from "styled-components";

const Tag = styled.div`
  border-radius: 5px;
  background: #badafe;
  color: black;
  padding: 1px 8px;
  float: left;
  margin: 2px 2px;
  font-size: 9pt;
`;

export default ({ array, styles }) => {
  if (!array || array.length === 0) return <span />;
  return (
    <div style={styles}>
      {array.map((tag) => (
        <Tag>{tag}</Tag>
      ))}
    </div>
  );
};
