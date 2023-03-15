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
		allAuthors(name: String): [Author]! 
		allBooks(title: String, author: String): [Book]!
		findBook(title: String!): Book
		findAuthor(name: String!): Author
		ownedBooks: [Book]!
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
		addBookToOwned(
			id: ID!
		): User
		removeBookFromOwned(
			id: ID!
		): User
		addBook(
			title: String!
			author: String!
		): Book
		editBook(
			id: ID!
			title: String!
			author: String!
		): Book
	}
`;

module.exports = typeDefs;
