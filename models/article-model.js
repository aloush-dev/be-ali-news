const db = require("../db/connection");

exports.fetchArticlesByID = (reqParams) => {
  const { article_id } = reqParams;
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return data.rows;
    });
};

exports.fetchArticleVotes = (articleID, votes) => {
  if (!votes.hasOwnProperty("inc_votes")) {
    return Promise.reject({ status: 400, msg: "Wrong Object Type" });
  }
  const { article_id } = articleID;
  const { inc_votes } = votes;

  return db
    .query(
      `UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then((data) => {
      return data.rows;
    });
};

exports.fetchCommentCount = (articleID = { article_id: "1" }) => {
  const { article_id } = articleID;

  return db
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    .then((data) => {;
      return data.rows.length;
    });
};
