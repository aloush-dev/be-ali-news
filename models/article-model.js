const db = require("../db/connection");

exports.fetchArticlesByID = (reqParams) => {
  const { article_id } = reqParams;
  return db
    .query(
      `SELECT articles.*, COUNT(comment_id) :: INT
      AS comment_count 
      FROM articles 
      LEFT JOIN comments
      ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
      [article_id]
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      };
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

exports.fetchArticles = () => {
  return db
    .query(
      `SELECT articles.*, COUNT(comment_id) :: INT
  AS comment_count 
  FROM articles 
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY created_at DESC;`
    )
    .then((data) => {
      return data.rows;
    });
};
