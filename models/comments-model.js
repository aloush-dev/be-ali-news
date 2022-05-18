const db = require("../db/connection");

exports.fetchComments = (reqParams) => {
  const { article_id } = reqParams;
  return db
    .query(
      `SELECT * FROM comments 
  WHERE article_id = $1`,
      [article_id]
    )
    .then((data) => {
        console.log(data.rows)
      return data.rows;
    });
};
