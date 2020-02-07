const loki = require("lokijs");
const db = new loki("sandbox.db");

// Add a collection to the database
const collection = db.addCollection(process.env.COLLECTION_NAME);

module.exports = { collection };
