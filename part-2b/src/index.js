import ReactDOM from "react-dom/client";

import App from "./App";

const notes = [];

ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notes} />
);
