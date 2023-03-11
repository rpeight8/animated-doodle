import { ApolloClient, InMemoryCache } from "@apollo/client";

const baseUrl = "http://localhost:4000";

const Client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache(),
});

export default Client;
