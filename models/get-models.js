const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((data) => {
    return data.rows;
  });
};

exports.fetchArticles = (reqParams) => {
  const { article_id } = reqParams;
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((data) => {
      return data.rows;
    });
};
