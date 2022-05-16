const { fetchTopics } = require("../models/topic-model");

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

