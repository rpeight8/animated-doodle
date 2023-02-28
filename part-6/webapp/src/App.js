import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import AddForm from "./components/NoteAddForm";
import NotesList from "./components/NotesList";

function App() {
  return (
    <div>
      <AddForm />
      <NotesList />
    </div>
  );
}

export default App;
