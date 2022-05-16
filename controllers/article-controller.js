const res = require("express/lib/response");
const {
  fetchArticlesByID,
  fetchArticleVotes,
} = require("../models/article-model");

exports.getArticlesByID = (req, res, next) => {
  fetchArticlesByID(req.params)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send("Not Found");
      }
      res.status(200).send({ article: data[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotes = (req, res, next) => {
  if(!req.body.hasOwnProperty("inc_votes")){
    res.status(400).send("Wrong Object Type")
  }

  const { article_id } = req.params;
  const { inc_votes } = req.body;

  fetchArticleVotes(article_id, inc_votes)
    .then((data) => {
      res.status(201).send({ article: data[0] });
    })
    .catch((err) => {
      next(err);
    });
};
