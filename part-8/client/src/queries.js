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
  query findBooksByAuthor($title: String!) {
    allBooks(title: $title) {
      title
      author
      id
    }
  }
`;

export const FIND_BOOKS = gql`
  query findBooksByTitle($title: String!) {
    allBooks(title: $title) {
      title
      author
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
      id
    }
  }
`;

export const EDIT_BOOK = gql`
  mutation editBook($id: ID!, $newTitle: String!, $newAuthor: String!) {
    editBook(id: $id, title: $newTitle, author: $newAuthor) {
      title
      author
      id
    }
  }
`;
