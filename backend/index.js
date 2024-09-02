require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const mongoClient = require("./models/db");
const authRoutes = require("./routes/auth");

async function start() {
  const app = express();
  app.use(bodyParser.json());

  app.use("/users", authRoutes);

  await mongoClient.connect();

  const { PORT } = process.env;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
