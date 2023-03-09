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
		published: Int!
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
		allBooks(author: String, published: Int): [Book!]!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
		): Book
		editAuthor(
			name: String!
			setNewName: String!
		): Author
	}
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,

    allBooks: (root, args) => {
      if (!args.author && !args.published) {
        return books;
      }
      const { id: authorId } = authors.find(
        (author) => author.name === args.author
      );

      if (!authorId) {
        throw new GraphQLError("Author does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      return books.filter((book) => {
        if (authorId && book.author !== authorId) {
          return false;
        }
        if (args.published && book.published !== args.published) {
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
      let author = authors.find((a) => a.name === args.author);
      if (!author) {
        author = { name: args.author, id: uuid() };
        authors = authors.concat(author);
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  port: 4000,
});
