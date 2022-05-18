exports.handleApiReqErrors = ("/api/*", (req, res) => {
    res.status(404).send({ msg: "Endpoint Not Found" });
  });
  
  // Custom Error Handling
  exports.handleCustomErrors = ((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  });
  
  // PSQL Error Handling
  exports.handlePsqlErrors = ((err, req, res, next) => {
    if (err.code === "23503") {
      res.status(404).send({ msg: "User Not Found" });
    } 
    else if (err.code === "22P02") {
      res.status(400).send({ msg: "Bad Request" });
    } 
    else next(err);
  });
  
  //Server Error Handling
exports.handleServerErrors = ((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  });
  