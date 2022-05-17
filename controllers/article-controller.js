const {
  fetchArticlesByID,
  fetchArticleVotes,
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
