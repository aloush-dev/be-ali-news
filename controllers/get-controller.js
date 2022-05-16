const { fetchTopics, fetchArticles } = require("../models/get-models");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((data) => {
      res.status(200).send({ topics: data });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles(req.params)
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
