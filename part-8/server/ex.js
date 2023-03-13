import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { v4 as uuid } from "uuid";

let authors = [
  {
    name: "Robert Martin",
    id: uuid(),
  },
  {
    name: "Martin Fowler",
    id: uuid(),
  },
  {
    name: "Fyodor Dostoevsky",
    id: uuid(),
  },
];

let books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: authors[0].id,
    published: 1998,
    id: uuid(),
  },
  {
    title: "Jurassic Park",
    author: authors[1].id,
    published: 1990,
    id: uuid(),
  },
  {
    title: "The Lord of the Rings",
    author: authors[2].id,
    published: 1954,
    id: uuid(),
  },
  {
    title: "The Hobbit",
    author: authors[2].id,
    published: 1937,
    id: uuid(),
  },
];

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
    bookCount: () => books.length,
    authorCount: () => authors.length,

    allBooks: (root, args) => {
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

    allAuthors: () => {
      return authors.map((author) => {
        return {
          ...author,
          bookCount: books.filter((book) => book.author === author.id).length,
        };
      });
    },
  },

  Book: {
    author: (root) => {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  port: 4000,
});
