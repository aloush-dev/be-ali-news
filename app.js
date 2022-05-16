const express = require("express");
const app = express();

const { getTopics } = require("./controllers/get-controller");

app.get("/api/topics", getTopics);

app.get("/api/*", (req, res) => {
  res.status(404).send("Endpoint Not Found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
});

module.exports = app;
