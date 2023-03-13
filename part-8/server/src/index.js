const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const app = require("./app");
const { PORT, SECRET } = require("./configs/config");

// let authors = [
//   {
//     name: "Robert Martin",
//     id: uuid(),
//   },
//   {
//     name: "Martin Fowler",
//     id: uuid(),
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: uuid(),
//   },
// ];

// let books = [
//   {
//     title: "Harry Potter and the Chamber of Secrets",
//     author: authors[0].id,
//     published: 1998,
//     id: uuid(),
//   },
//   {
//     title: "Jurassic Park",
//     author: authors[1].id,
//     published: 1990,
//     id: uuid(),
//   },
//   {
//     title: "The Lord of the Rings",
//     author: authors[2].id,
//     published: 1954,
//     id: uuid(),
//   },
//   {
//     title: "The Hobbit",
//     author: authors[2].id,
//     published: 1937,
//     id: uuid(),
//   },
// ];

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
