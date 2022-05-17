const {
  fetchArticlesByID,
  fetchArticleVotes,
  fetchCommentCount,
} = require("../models/article-model");

exports.getArticlesByID = (req, res, next) => {
  Promise.all([fetchArticlesByID(req.params), fetchCommentCount(req.params)])
    .then((data) => {
      data[0][0].comment_count = data[1];
      res.status(200).send({ article: data[0][0] });
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
