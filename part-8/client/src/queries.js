import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      id
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
    }
  }
`;

export const FIND_BOOKS_BY_AUTHOR = gql`
	query findBooksByAuthor($author: String!) {
		allBooks(author: $author) {
			title
			author
			id
		}
	}
`;

