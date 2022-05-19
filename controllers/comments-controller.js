const {
  fetchComments,
  postDbComment,
  deleteDbComment,
} = require("../models/comments-model");

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

exports.deleteComment = (req, res, next) => {
  deleteDbComment(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
