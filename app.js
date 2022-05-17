const express = require("express");
const app = express();

const {
  handleApiReqErrors,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index");
const { getTopics } = require("./controllers/topic-controller");
const {
  getArticlesByID,
  patchArticleVotes,
} = require("./controllers/article-controller");
const { getUsers } = require("./controllers/user-controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesByID);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.get("/api/users", getUsers);

// ERROR HANDLING

app.get("/api/*", handleApiReqErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
