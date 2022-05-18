const { fetchComments } = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  fetchComments(req.params)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};
