const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const app = require("./app");
const { PORT, SECRET } = require("./configs/config");

startStandaloneServer(app, {
  port: PORT,
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "books"
      );
      return { currentUser };
    }
  },
});
