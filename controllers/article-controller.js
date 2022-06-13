const {
  fetchArticlesByID,
  fetchArticleVotes,
  fetchArticles,
  fetchComments,
  postDbComment,
  fetchArticleToPost,
} = require("../models/article-model");

exports.getArticlesByID = (req, res, next) => {
  fetchArticlesByID(req.params)
    .then((data) => {
      res.status(200).send({ article: data[0] });
    })

    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  fetchArticleVotes(req.params, req.body)
    .then((data) => {
      res.status(200).send({ article: data[0] });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query.sort_by, req.query.order, req.query.topic)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  fetchComments(req.params)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  postDbComment(req.params, req.body)
    .then((data) => {
      res.status(201).send({ comment: data[0] });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  fetchArticleToPost(req.body)
    .then((data) => {
      res.status(201).send({ article: data.body });
    })
    .catch(next);
};
