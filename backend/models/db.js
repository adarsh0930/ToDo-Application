const { MongoClient } = require("mongodb");

const connectionUrl = process.env.MONGO_URL;
const client = new MongoClient(connectionUrl);

module.exports = client;
