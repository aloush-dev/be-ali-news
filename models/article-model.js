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

exports.fetchArticles = (sortBy = "created_at", orderBy = "DESC", Topic) => {
  const sortByList = [
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];
  const orderByList = ["ASC", "asc", "DESC", "desc"];

  const queryValues = [];

  let queryStr = `SELECT articles.*, COUNT(comment_id) :: INT
  AS comment_count 
  FROM articles 
  LEFT JOIN comments
  ON articles.article_id = comments.article_id `;

  if (!sortByList.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "Invalid Sort Term" });
  }

  if (!orderByList.includes(orderBy)) {
    return Promise.reject({ status: 400, msg: "Invalid Order Term" });
  }

  if (Topic) {
    queryValues.push(Topic);
    queryStr += `WHERE topic = $1`;
  }

  return db
    .query(
      `${queryStr} GROUP BY articles.article_id ORDER BY ${sortBy} ${orderBy};`,
      queryValues
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return data.rows;
    });
};

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

  if (!reqBody.hasOwnProperty("username") && reqBody.hasOwnProperty("body")) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
    })
    .then(() => {
      if (typeof body !== "string") {
        return Promise.reject({ status: 400, msg: "Comment must be text" });
      }
      return db.query(
        `INSERT INTO comments(author,body,article_id) VALUES($1,$2,$3) RETURNING *;`,
        [username, body, article_id]
      );
    })
    .then((data) => {
      return data.rows;
    });
};

exports.fetchArticleToPost = (reqBody) => {
  const { author, title, body, topic } = reqBody;

  if (
    !reqBody.hasOwnProperty("author") &&
    reqBody.hasOwnProperty("body") &&
    reqBody.hasOwnProperty("title") &&
    reqBody.hasOwnProperty("topic")
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return db
    .query(
      `INSERT INTO articles(author,body,title,topic) VALUES ($1,$2,$3,$4) RETURNING *;`,
      [author, body, title, topic]
    )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};
