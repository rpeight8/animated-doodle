import { useDispatch } from "react-redux";
import { useEffect } from "react";

import "./App.css";
import AddForm from "./components/NoteAddForm";
import NotesList from "./components/NotesList";
import NotesFilters from "./components/NotesFilters";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import { setNotes } from "./reducers/notesReducer";
import { NotificationProvider } from "./notificationContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const notes = await noteService.getAll();
      dispatch(setNotes(notes));
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotificationProvider>
      <div>
        <Notification />
        <AddForm />
        <NotesFilters />
        <NotesList />
      </div>
    </NotificationProvider>
  );
}

export default App;
