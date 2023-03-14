const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const config = require("./configs/config");

const resolvers = {
  Query: {
    ownedBooks: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return currentUser.books;
    },

    allBooks: async (root, args, context) => {
      return Book.find({});
    },
    findBook: async (root, args) => {
      return Book.find({ title: new RegExp(args.title) });
    },

    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author?.name;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      try {
        const user = new User({ username: args.username });

        return user.save();
      } catch (err) {
        throw new GraphQLError("Something went wrong", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            err,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== config.SECRET) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.SECRET) };
    },
    addBook: async (root, args, context) => {
      try {
        const currentUser = context.currentUser;

        if (!currentUser) {
          throw new GraphQLError("not authenticated", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        const author = await Author.findById(args.author);

        if (!author) {
          throw new GraphQLError("Author does not exist", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          });
        }

        if (await Book.findOne({ title: args.title, author: author.id })) {
          throw new GraphQLError("Book already exists", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.title, args.author],
            },
          });
        }

        const book = new Book({ ...args });

        await book.save();
        currentUser.books = currentUser.books.concat({ id: book.id });
      } catch (err) {
        if (err instanceof GraphQLError) {
          throw err;
        }
        throw new GraphQLError("Something went wrong", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            err,
          },
        });
      }
    },

    addBookToOwned: async (root, args, context) => {
      try {
        const currentUser = context.currentUser;

        if (!currentUser) {
          throw new GraphQLError("not authenticated", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        const book = await Book.findById(args.id);
        if (!book) {
          throw new GraphQLError("Book does not exist", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.id],
            },
          });
        }

        currentUser.books = currentUser.books.concat(book);
        await currentUser.save();
        return currentUser;
      } catch (err) {
        if (err instanceof GraphQLError) {
          throw err;
        }
        throw new GraphQLError("Something went wrong", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            err,
          },
        });
      }
    },

    editBook: async (root, args) => {
      try {
        const [book, author] = await Promise.all([
          Book.findById(args.id),
          Author.findOne({ name: args.author }),
        ]);
        if (!book) {
          throw new GraphQLError("Book does not exist", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.id,
            },
          });
        }

        if (!author) {
          throw new GraphQLError("Author does not exist", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          });
        }

        book.title = args.title;
        book.author = author.id;

        return book.save();
      } catch (err) {
        if (err instanceof GraphQLError) {
          throw err;
        }
        throw new GraphQLError("Something went wrong", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            err,
          },
        });
      }
    },
  },
};

module.exports = resolvers;
