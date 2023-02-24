import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import App from "./App";

const notes = [];

ReactDOM.createRoot(document.getElementById(`root`)).render(
  <StrictMode>
    <App notes={notes} />
  </StrictMode>
);
