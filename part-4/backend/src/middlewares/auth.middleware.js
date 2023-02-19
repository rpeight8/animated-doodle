const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("token missing or invalid. Mdlwr");
  }

  req.token = authorization.replace("Bearer ", "");
  req.user = jwt.verify(req.token, process.env.SECRET);

  next();
};

module.exports = {
  auth,
};
