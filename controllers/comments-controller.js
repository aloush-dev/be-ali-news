const {
  deleteDbComment,
  fetchCommentVotes,
} = require("../models/comments-model");

exports.deleteComment = (req, res, next) => {
  deleteDbComment(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.updateCommentVotes = (req, res, next) => {
  fetchCommentVotes(req.params, req.body)
    .then((data) => {
      res.status(200).send({ comment: data });
    })
    .catch(next);
};
