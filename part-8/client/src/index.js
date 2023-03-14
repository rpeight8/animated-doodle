import ReactDOM from "react-dom/client";

import App from "./App";

import { LibraryContext } from "./LibraryContext";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LibraryContext>
    <App />
  </LibraryContext>
);
