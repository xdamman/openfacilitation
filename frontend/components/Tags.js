import styled from "styled-components";

const Tag = styled.div`
  border-radius: 5px;
  border: 1px solid rgb(153, 202, 255);
  color: rgb(51, 134, 255);
  padding: 1px 8px;
  float: left;
  margin: 2px 2px;
  font-size: 9pt;
`;

const Component = ({ array, styles }) => {
  if (!array || array.length === 0) return <span />;
  return (
    <div style={styles}>
      {array.map((tag, i) => tag && <Tag key={i}>{tag}</Tag>)}
    </div>
  );
};

export default Component;
