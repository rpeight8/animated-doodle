import React from "react";
import ReactDOM from "react-dom/client";
import reducer from "./reducer";
import { createStore } from "redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(reducer);
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  renderApp();
});
const App = () => {
  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
        <button onClick={() => store.dispatch({ type: "OK" })}>ok</button>
        <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
        <button onClick={() => store.dispatch({ type: "ZERO" })}>
          reset stats
        </button>
      </div>
      <div>
        <h1>Statistics</h1>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </>
  );
};

const renderApp = () => {
  root.render(<App />);
};

renderApp();
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
