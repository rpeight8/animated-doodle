import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import Client from "./ApolloClient";
import { LibraryContextProvider } from "./LibraryContext";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={Client}>
    <LibraryContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LibraryContextProvider>
  </ApolloProvider>
);
