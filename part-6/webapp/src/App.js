import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import AddForm from "./components/NoteAddForm";
import NotesList from "./components/NotesList";
import NotesFilters from "./components/NotesFilters";
import Notification from "./components/Notification";

function App() {
  return (
    <div>
      <Notification />
      <AddForm />
      <NotesFilters />
      <NotesList />
    </div>
  );
}

export default App;
