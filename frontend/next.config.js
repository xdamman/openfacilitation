module.exports = {
  env: {
    AIRTABLE_API_URL:
      process.env.AIRTABLE_API_URL || "https://api.airtable.com/v0",
    AIRTABLE_BASE: process.env.AIRTABLE_BASE,
  },
};
