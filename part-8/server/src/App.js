const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
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

	type Query {
		bookCount: Int!
		authorCount: Int!
		allAuthors: [Author!]! 
		allBooks: [Book!]!
		findBook(title: String!): [Book!]!
	}
	

	type Mutation {
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
    allBooks: async () => {
      return Book.find({});
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
  },

  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author?.name;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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

      return book.save();
    },

    editAuthor: (root, args) => {
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
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },

    editBook: async (root, args) => {
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
    },
  },
};

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
