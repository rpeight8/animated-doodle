import Client from "../ApolloClient";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      id
    }
  }
`;

async function getAllBooks() {
  const response = await Client.query({ ALL_BOOKS });
  if (!response) {
    return [];
  }

  return response.data.allBooks;
}

const BooksService = {
  getAllBooks,
};

export default BooksService;
