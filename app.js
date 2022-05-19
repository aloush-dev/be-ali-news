const express = require("express");
const app = express();

// Function Requires

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
  getArticles,
} = require("./controllers/article-controller");

const { getUsers } = require("./controllers/user-controller");

const {
  getComments,
  postComment,
  deleteComment,
} = require("./controllers/comments-controller");

//app.*

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesByID);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

// ERROR HANDLING

app.get("/api/*", handleApiReqErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
