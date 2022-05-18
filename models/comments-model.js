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
      return data.rows;
    });
};

exports.postDbComment = (reqParams, reqBody) => {
  const { article_id } = reqParams;
  const { username, body } = reqBody;

  if (typeof body !== 'string') {
    return Promise.reject({ status: 400, msg: "Comment must be text" });
  }
  return db
    .query(
      `INSERT INTO comments(author, body,article_id) VALUES($1,$2,$3) RETURNING *;`,
      [username, body, article_id]
    )
    .then((data) => {
      return data.rows;
    });
};
