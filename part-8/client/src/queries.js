import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author
    id
  }
`;

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    id
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($title: String, $author: String) {
    allBooks(title: $title, author: $author) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const FIND_BOOK_BY_TITLE = gql`
  query findBookByTitle($title: String!) {
    findBook(title: $title) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const FIND_AUTHOR_BY_NAME = gql`
  query findAuthorByName($name: String!) {
    findAuthor(name: $name) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_BOOK = gql`
  mutation editBook($id: ID!, $newTitle: String!, $newAuthor: String!) {
    editBook(id: $id, title: $newTitle, author: $newAuthor) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ADD_BOOK_TO_OWNED = gql`
  mutation addBookToOwned($id: ID!) {
    addBookToOwned(id: $id) {
      username
      books {
        ...BookDetails
      }
    }
  }
  ${BOOK_DETAILS}
`;

export const REMOVE_BOOK_FROM_OWNED = gql`
  mutation removeBookFromOwned($id: ID!) {
    removeBookFromOwned(id: $id) {
      username
      books {
        ...BookDetails
      }
    }
  }
  ${BOOK_DETAILS}
`;

export const OWNED_BOOKS = gql`
  query ownedBooks {
    ownedBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
