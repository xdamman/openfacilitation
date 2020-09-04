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
      fontSize: "12pt",
    }}
  />
);

const SearchFormComponent = ({
  languages,
  types,
  cities,
  onChange,
  defaultValue,
}) => {
  defaultValue = defaultValue || {};

  const placeholders = {
    language: "Any language",
    city: "Anywhere",
    type: "Any type of meeting",
  };

  const state = {
    language: defaultValue.language,
    city: defaultValue.city,
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
  const cityOptions = cities.map((city) => {
    return { id: city, name: city };
  });
  cityOptions.unshift({ id: null, name: placeholders.city });

  return (
    <SearchForm>
      <Flex width={1}>
        <Box mr={2}>
          <StyledSelect
            id="city"
            name="city"
            defaultValue={state.city && state.city.toLowerCase()}
            minWidth="140px"
            onChange={(e) => handlechange("city", e.target.value)}
          >
            {Object.entries(cityOptions).map(([key, city]) => (
              <option key={key} value={city.name.toLowerCase()}>
                {city.name}
              </option>
            ))}
          </StyledSelect>
        </Box>
        <Box mr={2}>
          <StyledSelect
            id="language"
            name="language"
            defaultValue={state.language && state.language.toLowerCase()}
            minWidth="140px"
            onChange={(e) => handlechange("language", e.target.value)}
          >
            {Object.entries(languageOptions).map(([key, language]) => (
              <option key={key} value={language.name.toLowerCase()}>
                {language.name}
              </option>
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

export default SearchFormComponent;
