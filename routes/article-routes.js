const express = require("express");
const router = express.Router();

const {
  getArticlesByID,
  patchArticleVotes,
  getArticles,
  getComments,
  postComment,
  postArticle,
} = require("../controllers/article-controller");

router.get("/api/articles", getArticles);

router.get("/api/articles/:article_id", getArticlesByID);

router.patch("/api/articles/:article_id", patchArticleVotes);

router.get("/api/articles/:article_id/comments", getComments);

router.post("/api/articles", postArticle);

router.post("/api/articles/:article_id/comments", postComment);

module.exports = router;
