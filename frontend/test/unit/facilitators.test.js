/* eslint-env jest */

const facilitatorsData = require("../fixtures/Facilitators.json");
const languagesData = require("../fixtures/Languages.json");
const eventsData = require("../fixtures/Events.json");
const typesData = require("../fixtures/Types.json");
import { getData, map, join } from "../../lib/data";
import { get } from "lodash";

const facilitators = facilitatorsData.records.map((r) =>
  map("Facilitators", r)
);
const languages = languagesData.records.map((r) => map("Languages", r));
const types = typesData.records.map((r) => map("Types", r));
const events = eventsData.records.map((r) => map("Events", r));

describe("join table", () => {
  it("maps the schema", () => {
    expect(facilitators.length).toEqual(facilitatorsData.records.length);
    expect(facilitators[0].name).toEqual(
      facilitatorsData.records[0].fields.Name
    );

    const joined = join(
      join(facilitators, "languages", languages, "name"),
      "meetingTypes",
      types,
      "name"
    );

    expect(joined[1].languages).toContain("English");
    expect(joined[1].languages).toContain("Dutch");
    expect(joined[0].picture.small).toContain("https://");
    expect(joined[0].picture.large).toContain("https://");
    expect(joined[0].meetingTypes).toContain("People Assembly");
  });
  it("maps the schema Events", () => {
    const joined = join(facilitators, "events", events, "name");
    expect(joined[0].events[0]).toContain("Fridays for Future with Greta");
  });

  it("filters the facilitators by language", async () => {
    const res = await getData("Facilitators", { language: "French" });
    expect(res.length).toEqual(1);
  });
  it("filters the events by facilitator", async () => {
    const res = await getData("Events", { facilitator: "Xavier Damman" });
    expect(res.length).toEqual(2);
  });
  it("joins the events and clients", async () => {
    const eventsTable = await getData("Events", {
      facilitator: "Leen Schelfhout",
    });
    const clientsTable = await getData("Clients", {
      facilitator: "Leen Schelfhout",
    });
    const joined = join(eventsTable, "client", clientsTable, "name");
    expect(clientsTable.length).toEqual(3);
  });

  it("fetches Nele and join with other tables", async () => {
    const params = { facilitatorid: "rec6t4wMI1lLUv60c" };
    const languages = await getData("Languages");
    const meetingTypes = await getData("Types");
    let facilitator = await getData("Facilitators", {
      id: params.facilitatorid,
    });

    const eventsTable = await getData("Events", {
      facilitator: facilitator.name,
    });
    const clients = await getData("Clients", {
      facilitator: facilitator.name,
    });
    const events = join(eventsTable, "client", clients);
    facilitator = join(
      join(
        join([facilitator], "languages", languages, "name"),
        "meetingTypes",
        meetingTypes,
        "name"
      ),
      "events",
      events
    )[0];
    // console.log(JSON.stringify(facilitator, null, "  "));
    expect(facilitator.events[0].client[0].name).toEqual("Fridays for Future");
    expect(facilitator.languages.length).toEqual(2);
  });
  it("fetches Mees and join with other tables", async () => {
    const params = { facilitatorid: "recNTugJhswCLFztA" };
    const languages = await getData("Languages");
    const meetingTypes = await getData("Types");
    let facilitator = await getData("Facilitators", {
      id: params.facilitatorid,
    });

    const eventsTable = await getData("Events", {
      facilitator: facilitator.name,
    });
    const clients = await getData("Clients", {
      facilitator: facilitator.name,
    });
    console.log(">>> eventsTable", eventsTable);
    console.log(">>> clients", clients);
    const events = join(eventsTable, "client", clients);
    console.log(">>> events", events);
    facilitator = join(
      join(
        join([facilitator], "languages", languages, "name"),
        "meetingTypes",
        meetingTypes,
        "name"
      ),
      "events",
      events
    )[0];
    console.log(JSON.stringify(facilitator, null, "  "));
    expect(facilitator.events).toBeNull();
    expect(facilitator.languages.length).toEqual(2);
  });
  it("filters the facilitators by language and type", async () => {
    const res = await getData("Facilitators", {
      language: "French",
      type: "Team retreats",
    });
    expect(res.length).toEqual(1);
  });

  it.only("gets the list of cities", async () => {
    const res = await getData("Facilitators", {
      view: "Cities",
      fields: ["Country", "City"],
      distinct: "City",
    });
    expect(res.length).toEqual(3);
    expect(res[0]).toEqual("Brussels");
  });
});
