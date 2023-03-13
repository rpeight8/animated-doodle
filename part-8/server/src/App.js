const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const config = require("./configs/config");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.MONGODB_URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const typeDefs = `
	type Book {
		title: String!
		author: String!
		id: ID!
	}

	type Author {
		name: String!
		id: ID!,
	}

	type User {
		username: String!
		books: [Book!]!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allAuthors: [Author!]! 
		allBooks: [Book!]!
		findBook(title: String!): [Book!]!
		me: User
	}

	type Mutation {
		createUser(
			username: String!
		): User
		login(
			username: String!
			password: String!
		): Token
		addOwnBook(
			id: ID!
		): User
		addBook(
			title: String!
			author: String!
		): Book
		editAuthor(
			name: String!
			setNewName: String!
		): Author
		editBook(
			id: ID!
			title: String!
			author: String!
		): Book
	}
`;

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return currentUser.books;
      // if (!args.author && !args.title) {
      //   return Book.find({});
      // }
      // const queries = [];
      // if (args.author) {
      //   queries.push({ author: args.author });
      // }
      // if (args.title) {
      //   queries.push({ title: args.title });
      // }

      // return Book.find({
      //   $and: queries,
      // });
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

    addOwnBook: async (root, args, context) => {
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

    editAuthor: (root, args) => {
      try {
        const author = authors.find((a) => a.name === args.name);
        if (!author) {
          throw new GraphQLError("Author does not exist", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          });
        }

        const updatedAuthor = { ...author, name: args.setNewName };
        authors = authors.map((a) =>
          a.name === args.name ? updatedAuthor : a
        );
        return updatedAuthor;
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

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
