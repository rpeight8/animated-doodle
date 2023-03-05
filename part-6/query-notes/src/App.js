import { useQuery, useMutation, useQueryClient } from "react-query";
import { getNotes, createNote, updateNote } from "./services/notes";

const App = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote, variables) => {
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData("notes", notes.concat(newNote));
    },
  });

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (updatedNote, variables) => {
      const notes = queryClient
        .getQueryData("notes")
        .map((note) => (note.id === variables.id ? updatedNote : note));
      queryClient.setQueryData("notes", notes);
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content, importance: true });
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({
      id: note.id,
      note: {
        ...note,
        importance: !note.importance,
      },
    });
  };

  const result = useQuery("notes", getNotes, {
    refetchOnWindowFocus: false,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>Service re not available</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.importance ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
