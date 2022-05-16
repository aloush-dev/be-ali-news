const express = require("express");
const app = express();

app.use(express.json());

const { getTopics } = require("./controllers/topic-controller");
const {
  getArticlesByID,
  patchArticleVotes,
} = require("./controllers/article-controller");

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesByID);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.get("/api/*", (req, res) => {
  res.status(404).send({ msg: "Endpoint Not Found" });
});

// Custom Error Handling
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

// PSQL Error Handling
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

//Server Error Handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
