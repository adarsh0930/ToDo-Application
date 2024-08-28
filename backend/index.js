require("dotenv").config();
const express = require("express");

const app = express();

app.use("/", (req, res) => res.send());

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
