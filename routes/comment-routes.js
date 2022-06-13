const express = require("express");
const router = express.Router();

const {
  deleteComment,
  updateCommentVotes,
} = require("../controllers/comments-controller");

router.delete("/api/comments/:comment_id", deleteComment);

router.patch("/api/comments/:comment_id", updateCommentVotes);

module.exports = router;
