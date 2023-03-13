const { startStandaloneServer } = require("@apollo/server/standalone");

const app = require("./app");
const { PORT } = require("./configs/config");

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
});
