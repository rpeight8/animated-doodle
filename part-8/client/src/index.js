import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";

import Client from "./ApolloClient";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>
);
