const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then((data) => {
    return data.rows;
  });
};

exports.fetchUserByUsername = (reqParams) => {
  const { username } = reqParams;

  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User Not Found" });
      }

      return data.rows[0];
    });
};

exports.fetchUserToPost = (reqBody) => {
  const { username, name, avatar_url } = reqBody;

  return db
    .query(
      `INSERT INTO users(username,name, avatar_url) VALUES ($1,$2,$3) RETURNING *;`,
      [username, name, avatar_url]
    )
    .then((data) => {
      return data.rows[0];
    });
};
