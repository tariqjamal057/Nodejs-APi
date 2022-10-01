const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
  console.log(token);
  token = token.slice(7, token.length);
  console.log(token);
  if (token) {
    jwt.verify(token, "hello", (err, decoded) => {
        console.log(decoded);
      if (err) {
        return res.json({
          status: false,
          msg: "token is invalid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      msg: "token is not provided",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
