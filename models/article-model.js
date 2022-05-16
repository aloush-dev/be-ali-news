const db = require("../db/connection");

exports.fetchArticlesByID = (reqParams) => {
  const { article_id } = reqParams;
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((data) => {
      return data.rows;
    });
};

exports.fetchArticleVotes = (articleID, votes) => {
  if (articleID > 0) {
    return db
      .query(
        `UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *`,
        [votes, articleID]
      )
      .then((data) => {
        return data.rows;
      });
  } else {
    return db
      .query(
        `UPDATE articles SET votes = votes-$1 WHERE article_id = $2 RETURNING *`,
        [votes, articleID]
      )
      .then((data) => {
        return data.rows;
      });
  }
};
