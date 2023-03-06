import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";

import { useState } from "react";

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  );
};

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("user1337");
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <p>has {note.important ? "" : "not"} important</p>
    </div>
  );
};

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
    date: "2019-05-30T17:30:31.098Z",
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    important: false,
    date: "2019-05-30T18:39:34.091Z",
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
    date: "2019-05-30T19:20:14.298Z",
  },
];

const App = () => {
  const [user, setUser] = useState(null);

  const padding = {
    padding: 5,
  };

  const noteMatch = useMatch("/notes/:id");
  const note = noteMatch
    ? notes.find((note) => note.id === Number(noteMatch.params.id))
    : null;

  return (
    <>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route
          path="/notes/:id"
          element={
            user ? <Note note={note} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/notes"
          element={
            user ? <Notes notes={notes} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <i>Note app, Department of Computer Science 2023</i>
      </footer>
    </>
  );
};

export default App;
