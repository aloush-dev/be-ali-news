const db = require("../db/connection");

exports.fetchArticlesByID = (reqParams) => {
    const { article_id } = reqParams;
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then((data) => {
        return data.rows;
      });
  };