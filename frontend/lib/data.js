import { get } from "lodash";
import fetch from "node-fetch";
import "dotenv";

const mockedData = {
  Languages: require("../test/fixtures/Languages.json"),
  Types: require("../test/fixtures/Types.json"),
};

export async function getData(table, query = {}) {
  let queryURL = `${process.env.AIRTABLE_API_URL}/${process.env.AIRTABLE_BASE}/${table}`;
  if (query.id) {
    console.log(
      `>>> fetching ${table} data from Airtable API with id ${query.id}`
    );
    queryURL += `/${query.id}`;
  } else {
    console.log(`>>> fetching ${table} data from Airtable API`);
  }

  const filterByFormula = [];
  if (query.facilitator && query.facilitator !== "any") {
    filterByFormula.push(
      `SEARCH('${query.facilitator}', ARRAYJOIN({Facilitators}))`
    );
  }
  if (query.language && query.language !== "all") {
    filterByFormula.push(`SEARCH('${query.language}', ARRAYJOIN({Languages}))`);
  }
  if (query.type && query.type !== "any") {
    filterByFormula.push(
      `SEARCH('${query.type}', ARRAYJOIN({Types of meetings}))`
    );
  }
  // Sort by Name ASC
  if (!query.id) {
    queryURL += `?sort%5B0%5D%5Bfield%5D=Name&sort%5B0%5D%5Bdirection%5D=asc`;
    if (filterByFormula.length > 0) {
      const filterByFormulaStr = `AND(${filterByFormula.join(", ")})`;
      queryURL += `&filterByFormula=${encodeURIComponent(filterByFormulaStr)}`;
    }
  }
  // console.log("queryURL", queryURL);
  let json;
  if (!query.id && filterByFormula.length === 0 && mockedData[table]) {
    json = mockedData[table];
  } else {
    const res = await fetch(queryURL, {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    });
    json = await res.json();
    // console.log(">>> JSON", JSON.stringify(json, null, "  "));
  }

  if (!json) {
    console.error("No result for", table);
    return null;
  }
  if (query.id) {
    return map(table, json);
  } else {
    if (!json.records || json.records.length < 1) {
      console.error("No result for", table);
      return [];
    }

    return json.records.map((record) => map(table, record));
  }
}

export function map(template, data) {
  const mapping = {
    Languages: {
      id: "id",
      name: "fields.Name",
    },
    Types: {
      id: "id",
      name: "fields.Name",
    },
    Clients: {
      id: "id",
      name: "fields.Name",
      logo: {
        small: "fields.Logo[0].thumbnails.small.url",
        large: "fields.Logo[0].thumbnails.large.url",
      },
      description: "fields.Description",
      website: "fields.Website",
    },
    Events: {
      id: "id",
      name: "fields.Name",
      location: "fields.Location",
      description: "fields.Description",
      attendees: "fields.Attendees",
      picture: {
        small: "fields.Attachments[0].thumbnails.small.url",
        large: "fields.Attachments[0].thumbnails.large.url",
      },
      client: "fields.Client",
      startDate: "fields.Start date",
      duration: "fields.Duration",
    },
    Facilitators: {
      id: "id",
      name: "fields.Name",
      email: "fields.Email",
      description: "fields.Description",
      gender: "fields.Gender",
      city: "fields.City",
      country: "fields.Country",
      birthdate: "fields.Birthdate",
      picture: {
        small: "fields.Picture[0].thumbnails.small.url",
        large: "fields.Picture[0].thumbnails.large.url",
      },
      meetingTypes: "fields.Types of meetings",
      events: "fields.Events facilitated",
      status: "fields.status",
      languages: "fields.Languages",
    },
  };
  if (!mapping[template]) return data;

  const mapSchema = function (schema, data) {
    const row = {};
    Object.keys(schema).map((key) => {
      switch (typeof schema[key]) {
        case "string":
          row[key] = get(data, schema[key], null);
          break;
        case "object":
          row[key] = mapSchema(schema[key], data);
          break;
      }
    });
    return row;
  };
  return mapSchema(mapping[template], data);
}

export function join(table1, field1, table2, field2) {
  if (!table1 || !table1.length || table1.length < 1) {
    return console.error("Invalid table1", table1);
  }
  if (!table2 || !table2.length || table2.length < 1) {
    console.warn("Invalid table2", table2);
    return table1;
  }
  const resultTable = [];
  for (let i = 0; i < table1.length; i++) {
    const row = table1[i];
    if (row[field1]) {
      row[field1] = row[field1].map((id) => {
        const found = table2.find((r) => r.id === id);
        if (!found) return null;
        return field2 ? found[field2] : found;
      });
    }
    resultTable.push(row);
  }
  return resultTable;
}