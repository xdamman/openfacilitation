import styled from "styled-components";
import { Flex, Box } from "rebass";
import { Select } from "@rebass/forms";

const SearchForm = styled.div``;

const StyledSelect = (props) => (
  <Select
    {...props}
    sx={{
      borderRadius: "4px",
      borderColor: "#3B84FD",
    }}
  />
);

export default ({ languages, types, onChange, defaultValue }) => {
  defaultValue = defaultValue || {};

  const placeholders = {
    language: "Any language",
    type: "Any type of meeting",
  };

  const state = {
    language: defaultValue.language,
    type: defaultValue.type,
  };

  function handlechange(field, value) {
    if (value === placeholders[field]) {
      value = undefined;
    }

    state[field] = value;
    if (typeof onChange === "function") {
      onChange(state);
    }
  }
  if (!languages || !types) {
    return <div />;
  }

  const languageOptions = [
    { id: null, name: placeholders.language },
    ...languages,
  ];
  const typeOptions = [{ id: null, name: placeholders.type }, ...types];

  return (
    <SearchForm>
      <Flex width={1}>
        <Box mr={2}>
          <StyledSelect
            id="language"
            name="language"
            defaultValue={state.language}
            minWidth="140px"
            onChange={(e) => handlechange("language", e.target.value)}
          >
            {Object.entries(languageOptions).map(([key, language]) => (
              <option key={key}>{language.name}</option>
            ))}
          </StyledSelect>
        </Box>
        <Box mr={2}>
          <StyledSelect
            id="type"
            name="type"
            defaultValue={state.type}
            onChange={(e) => handlechange("type", e.target.value)}
          >
            {Object.entries(typeOptions).map(([key, type]) => (
              <option key={key}>{type.name}</option>
            ))}
          </StyledSelect>
        </Box>
        <Box></Box>
      </Flex>
    </SearchForm>
  );
};
