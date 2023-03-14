import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const baseUrl = "http://localhost:4000";

const authLink = setContext((_, { headers }) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const Client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache(),
  link: authLink.concat(createHttpLink({ uri: baseUrl })),
});

export default Client;
