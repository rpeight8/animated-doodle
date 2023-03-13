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
		bookCount: Int!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allAuthors: [Author!]! 
		allBooks(author: String, title: String): [Book!]!
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
    allBooks: async (root, args) => {
      const books = await Book.find({});
      if (!args.author && !args.title) {
        return books;
      }

      return books.filter((book) => {
        if (args.authorId && book.author !== args.authorId) {
          return false;
        }

        if (args.title && !book.title.includes(args.title)) {
          return false;
        }

        return true;
      });
    },

    allAuthors: async () => Author.find({}),
  },

  Book: {
    author: async (root) => {
      const authors = await Author.find({});
      const author = authors.find((author) => author.id === root.author);
      return author.name;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (
        books.some(
          (book) => book.title === args.title && book.author === args.author
        )
      )
        throw new GraphQLError("Book already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });

      let author = authors.find((a) => a.id === args.author);
      if (!author) {
        throw new GraphQLError("Author does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      const book = { ...args, id: uuid(), author: author.id };
      books = books.concat(book);
      return book;
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

    editBook: (root, args) => {
      console.log(args);
      const book = books.find((b) => b.id === args.id);
      if (!book) {
        throw new GraphQLError("Book does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.id,
          },
        });
      }

      const author = authors.find((a) => a.name === args.author);
      if (!author) {
        throw new GraphQLError("Author does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      const updatedBook = { ...book, title: args.title, author: author.id };
      books = books.map((b) => (b.id === args.id ? updatedBook : b));
      return updatedBook;
    },
  },
};

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
