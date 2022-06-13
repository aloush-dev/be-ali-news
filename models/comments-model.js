const db = require("../db/connection");

exports.deleteDbComment = (reqBody) => {
  const { comment_id } = reqBody;
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      }
    });
};

exports.fetchCommentVotes = (reqParams, votes) => {
  const { inc_votes } = votes;
  const { comment_id } = reqParams;

  if (!votes.hasOwnProperty("inc_votes")) {
    return Promise.reject({ status: 400, msg: "Wrong Object Type" });
  }

  return db
    .query(
      `UPDATE comments SET votes = votes+$1 WHERE comment_id = $2 RETURNING *`,
      [inc_votes, comment_id]
    )
    .then((data) => {
      return data.rows[0];
    });
};
