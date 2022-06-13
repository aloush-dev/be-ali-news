const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const articleRoutes = require("./routes/article-routes");
const topicRoutes = require("./routes/topic-routes");
const userRoutes = require("./routes/user-routes");
const commentRoutes = require("./routes/comment-routes");
const cors = require('cors');
// Function Requires

const {
  handleApiReqErrors,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index");

//app.*

app.use(cors());

app.use(express.json());

app.use(articleRoutes);

app.use(topicRoutes);

app.use(userRoutes);

app.use(commentRoutes);


app.get("/api", (req, res, next) => {
  res.send(endpoints);
});

// ERROR HANDLING

app.get("/api/*", handleApiReqErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
