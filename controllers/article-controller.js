const { fetchArticlesByID } = require("../models/article-model");


exports.getArticlesByID = (req, res, next) => {
    fetchArticlesByID(req.params)
      .then((data) => {
        if (data.length === 0) {
          res.status(404).send("Not Found");
        }
        res.status(200).send({ article: data[0] });
      })
      .catch((err) => {
        next(err);
      });
  };
  